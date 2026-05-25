const PLACEHOLDERS = [
  'patientName', 'patientDocument', 'reservationTime',
  'doctorName', 'operatorName', 'medicalRecord',
]

export function renderTemplate(template, data) {
  if (!template) return ''
  let result = template
  for (const key of PLACEHOLDERS) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
    result = result.replace(regex, data[key] || '')
  }
  return result
}

export function extractPlaceholders(template) {
  if (!template) return []
  const matches = template.match(/\{\{(\w+)\}\}/g)
  if (!matches) return []
  return matches.map(m => m.replace(/\{\{/, '').replace(/\}\}/, ''))
}
