import { useState, useCallback, useRef } from 'react'

export function useCrud(storageKey) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const itemsRef = useRef(items)
  itemsRef.current = items

  const persist = useCallback((newItems) => {
    localStorage.setItem(storageKey, JSON.stringify(newItems))
    setItems(newItems)
  }, [storageKey])

  const add = useCallback((item) => {
    const newItem = { ...item, id: Date.now().toString() }
    const updated = [...itemsRef.current, newItem]
    persist(updated)
    return newItem
  }, [persist])

  const update = useCallback((id, data) => {
    const updated = itemsRef.current.map(item =>
      item.id === id ? { ...item, ...data } : item
    )
    persist(updated)
  }, [persist])

  const remove = useCallback((id) => {
    const updated = itemsRef.current.filter(item => item.id !== id)
    persist(updated)
  }, [persist])

  return { items, add, update, remove }
}
