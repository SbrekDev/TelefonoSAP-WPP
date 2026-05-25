export function toTitleCase(str) {
  if (!str) return ''
  return str.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })
}

export function toUpperCase(str) {
  if (!str) return ''
  return str.toUpperCase()
}
