const DB_NAME = 'sap-telefonowpp'
const DB_VERSION = 2

function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not available'))
      return
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.has('items')) {
        db.createObjectStore('items', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.has('notas')) {
        db.createObjectStore('notas', { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function withStore(storeName, mode, callback) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode)
      const store = tx.objectStore(storeName)
      Promise.resolve(callback(store)).then(resolve).catch(reject)
      tx.oncomplete = () => db.close()
      tx.onerror = () => { reject(tx.error); db.close() }
    })
  })
}

function createStoreAPI(storeName, fallbackKey) {
  const fallback = {
    getAll() {
      try {
        const stored = localStorage.getItem(fallbackKey)
        return stored ? JSON.parse(stored) : []
      } catch { return [] }
    },
    put(item) {
      try {
        const items = this.getAll()
        const idx = items.findIndex((i) => i.id === item.id)
        if (idx >= 0) items[idx] = item
        else items.push(item)
        localStorage.setItem(fallbackKey, JSON.stringify(items))
      } catch {}
    },
    delete(id) {
      try {
        const items = this.getAll().filter((i) => i.id !== id)
        localStorage.setItem(fallbackKey, JSON.stringify(items))
      } catch {}
    },
  }

  return {
    async getAll() {
      try {
        return await withStore(storeName, 'readonly', (store) => {
          return new Promise((resolve, reject) => {
            const req = store.getAll()
            req.onsuccess = () => resolve(req.result)
            req.onerror = () => reject(req.error)
          })
        })
      } catch { return fallback.getAll() }
    },
    async put(item) {
      try {
        await withStore(storeName, 'readwrite', (store) => {
          return new Promise((resolve, reject) => {
            const req = store.put(item)
            req.onsuccess = () => resolve()
            req.onerror = () => reject(req.error)
          })
        })
      } catch { fallback.put(item) }
    },
    async delete(id) {
      try {
        await withStore(storeName, 'readwrite', (store) => {
          return new Promise((resolve, reject) => {
            const req = store.delete(id)
            req.onsuccess = () => resolve()
            req.onerror = () => reject(req.error)
          })
        })
      } catch { fallback.delete(id) }
    },
  }
}

const itemsAPI = createStoreAPI('items', 'mensajes_usuario')
export const dbGetAll = itemsAPI.getAll
export const dbPut = itemsAPI.put
export const dbDelete = itemsAPI.delete

export const notasAPI = createStoreAPI('notas', 'notas_temporales')
