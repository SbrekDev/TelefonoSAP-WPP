const DB_NAME = 'proyectotelefono'
const DB_VERSION = 1

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
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function withStore(mode, callback) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('items', mode)
      const store = tx.objectStore('items')
      Promise.resolve(callback(store)).then(resolve).catch(reject)
      tx.oncomplete = () => db.close()
      tx.onerror = () => { reject(tx.error); db.close() }
    })
  })
}

export async function dbGetAll() {
  try {
    return await withStore('readonly', (store) => {
      return new Promise((resolve, reject) => {
        const req = store.getAll()
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
      })
    })
  } catch {
    return localStorageFallback.getAll()
  }
}

export async function dbPut(item) {
  try {
    await withStore('readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const req = store.put(item)
        req.onsuccess = () => resolve()
        req.onerror = () => reject(req.error)
      })
    })
  } catch {
    localStorageFallback.put(item)
  }
}

export async function dbDelete(id) {
  try {
    await withStore('readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const req = store.delete(id)
        req.onsuccess = () => resolve()
        req.onerror = () => reject(req.error)
      })
    })
  } catch {
    localStorageFallback.delete(id)
  }
}

const FALLBACK_KEY = 'mensajes_usuario'

const localStorageFallback = {
  getAll() {
    try {
      const stored = localStorage.getItem(FALLBACK_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },
  put(item) {
    try {
      const items = this.getAll()
      const idx = items.findIndex((i) => i.id === item.id)
      if (idx >= 0) {
        items[idx] = item
      } else {
        items.push(item)
      }
      localStorage.setItem(FALLBACK_KEY, JSON.stringify(items))
    } catch {
    }
  },
  delete(id) {
    try {
      const items = this.getAll().filter((i) => i.id !== id)
      localStorage.setItem(FALLBACK_KEY, JSON.stringify(items))
    } catch {
    }
  },
}
