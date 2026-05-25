import { useState, useCallback } from 'react'

export function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(value => {
    setStoredValue(prev => {
      const nextValue = typeof value === 'function' ? value(prev) : value
      sessionStorage.setItem(key, JSON.stringify(nextValue))
      return nextValue
    })
  }, [key])

  const removeValue = useCallback(() => {
    sessionStorage.removeItem(key)
    setStoredValue(initialValue)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
