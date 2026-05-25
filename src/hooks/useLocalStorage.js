import { useState, useCallback, useEffect, useRef } from 'react'

const SYNC_EVENT = 'local-storage-sync'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const keyRef = useRef(key)
  keyRef.current = key

  useEffect(() => {
    const handler = (e) => {
      if (e.detail.key !== keyRef.current) return
      try {
        const item = localStorage.getItem(keyRef.current)
        if (item !== null) {
          setStoredValue(JSON.parse(item))
        }
      } catch {}
    }
    window.addEventListener(SYNC_EVENT, handler)
    return () => window.removeEventListener(SYNC_EVENT, handler)
  }, [])

  const setValue = useCallback(value => {
    setStoredValue(prev => {
      const nextValue = typeof value === 'function' ? value(prev) : value
      localStorage.setItem(keyRef.current, JSON.stringify(nextValue))
      return nextValue
    })
    window.dispatchEvent(
      new CustomEvent(SYNC_EVENT, { detail: { key: keyRef.current } })
    )
  }, [])

  const removeValue = useCallback(() => {
    localStorage.removeItem(keyRef.current)
    setStoredValue(initialValue)
    window.dispatchEvent(
      new CustomEvent(SYNC_EVENT, { detail: { key: keyRef.current } })
    )
  }, [initialValue])

  return [storedValue, setValue, removeValue]
}
