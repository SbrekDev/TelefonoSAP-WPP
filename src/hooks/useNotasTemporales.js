import { useState, useEffect, useCallback, useRef } from 'react'
import { notasAPI } from '../utils/db'

export function useNotasTemporales() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    notasAPI.getAll().then((data) => {
      if (mountedRef.current) {
        setItems(data)
        setLoading(false)
      }
    })
    return () => { mountedRef.current = false }
  }, [])

  const add = useCallback(async (data) => {
    const now = new Date().toISOString()
    const newItem = {
      ...data,
      id: Date.now().toString(),
      createdAt: now,
    }
    await notasAPI.put(newItem)
    setItems((prev) => [...prev, newItem])
    return newItem
  }, [])

  const update = useCallback(async (id, data) => {
    const existing = items.find((i) => i.id === id)
    if (!existing) return
    const updated = { ...existing, ...data }
    await notasAPI.put(updated)
    setItems((prev) => prev.map((i) => (i.id === id ? updated : i)))
  }, [items])

  const remove = useCallback(async (id) => {
    await notasAPI.delete(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  return { items, loading, add, update, remove }
}
