import { useState, useEffect, useCallback, useRef } from 'react'
import { dbGetAll, dbPut, dbDelete } from '../utils/db'

export function useCustomMessages() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    dbGetAll().then((data) => {
      if (mountedRef.current) {
        setItems(data)
        setLoading(false)
      }
    })
    return () => { mountedRef.current = false }
  }, [])

  const add = useCallback(async (item) => {
    const newItem = { ...item, id: Date.now().toString() }
    await dbPut(newItem)
    setItems((prev) => [...prev, newItem])
    return newItem
  }, [])

  const update = useCallback(async (id, data) => {
    const existing = items.find((i) => i.id === id)
    if (!existing) return
    const updated = { ...existing, ...data }
    await dbPut(updated)
    setItems((prev) => prev.map((i) => (i.id === id ? updated : i)))
  }, [items])

  const remove = useCallback(async (id) => {
    await dbDelete(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  return { items, loading, add, update, remove }
}
