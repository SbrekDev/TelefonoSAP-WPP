const predefinedMessages = [
  {
    id: 'pre-1',
    title: 'Saludo inicial',
    template: `Buen día, mi nombre es {{operatorName}}.  
Nos comunicamos desde el Sanatorio Adventista para brindarle asistencia y acompañarlo en lo que necesite.`,
  },
  {
    id: 'pre-2',
    title: 'Saludo inicial con ayuda',
    template: `Buen día, mi nombre es {{operatorName}}.  
Nos comunicamos desde el Sanatorio Adventista para brindarle asistencia y acompañarlo en lo que necesite.
¿En qué podemos ayudarle?`,
  },
  {
    id: 'pre-3',
    title: 'Paciente no atendido previamente',
    template: `¿Ha sido atendido previamente en el Sanatorio Adventista?`,
  },
  {
    id: 'pre-4',
    title: 'Pedir datos para Historia Clínica',
    template: `¿Podría proporcionarnos la siguiente información para crear su historia clínica, por favor?

• Foto del DNI (frente y dorso)
• Nombre completo
• Edad
• Número de DNI
• Dirección
• Profesión
• Estado civil
• Obra social
• Número telefónico de contacto propio y de un familiar
• Correo electrónico

Toda la información es confidencial y se utiliza exclusivamente para brindarle una atención personalizada y eficiente. Gracias por su colaboración.`,
  },
    {
    id: 'pre-5',
    title: 'Turnos no disponibles',
    template: `Actualmente no contamos con turnos disponibles para lo solicitado.
Si lo desea, podemos ayudarle a buscar otras opciones disponibles.`,
  },
  {
    id: 'pre-6',
    title: 'Confirmación de turno',
    template: `Confirmamos su turno a nombre de {{patientName}}.

• Fecha: {{reservationDate}}
• Horario: {{reservationTime}}
• Profesional: {{doctorName}}
• Obra social: {{insuranceProvider}}

Le recordamos asistir con toda la documentación y estudios correspondientes para la atención.
`,
  },
  {
    id: 'pre-7',
    title: 'Saludo final',
    template: `Quedamos a disposición ante cualquier consulta.
Muchas gracias, que tenga un excelente día.
Saludos cordiales.`,
  }
]

export default predefinedMessages
