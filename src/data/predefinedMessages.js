const predefinedMessages = [
  {
    id: 'pre-1',
    title: 'Confirmación de turno',
    template: `Hola {{patientName}}, le confirmamos su turno con Dr/a. {{doctorName}} para el {{reservationTime}}.

Por favor, llegue 10 minutos antes para completar los datos necesarios.

Atendido por: {{operatorName}}`,
  },
  {
    id: 'pre-2',
    title: 'Recordatorio de turno',
    template: `Estimado/a {{patientName}}, le recordamos su turno con Dr/a. {{doctorName}} programado para el {{reservationTime}}.

Le solicitamos puntualidad. En caso de no poder asistir, le rogamos nos avise con anticipación.

Saludos cordiales.`,
  },
  {
    id: 'pre-3',
    title: 'Cancelación de turno',
    template: `Hola {{patientName}}, lamentamos informarle que su turno con Dr/a. {{doctorName}} del {{reservationTime}} ha sido cancelado por razones de fuerza mayor.

Nos comunicaremos a la brevedad para reprogramar su atención. Disculpe las molestias ocasionadas.`,
  },
  {
    id: 'pre-4',
    title: 'Recordatorio de documentación',
    template: `{{patientName}}, le recordamos traer su DNI, órdenes médicas y estudios previos para su turno del {{reservationTime}} con Dr/a. {{doctorName}}.

Sin la documentación requerida, la atención podría verse demorada. Ante cualquier duda, consulte.`,
  },
  {
    id: 'pre-5',
    title: 'Demora del médico',
    template: `Estimado/a {{patientName}}, le informamos que Dr/a. {{doctorName}} se encuentra con una demora en la agenda.

Su turno del {{reservationTime}} se retrasará aproximadamente 20 minutos. Le agradecemos su paciencia y comprensión.`,
  },
  {
    id: 'pre-6',
    title: 'Mensaje de bienvenida',
    template: `¡Bienvenido/a {{patientName}}! Usted ha sido registrado/a en nuestro sistema.

Su médico de cabecera es Dr/a. {{doctorName}}. Ante cualquier consulta o emergencia, no dude en contactarnos a la brevedad.

Atendido por: {{operatorName}}`,
  },
  {
    id: 'pre-7',
    title: 'Seguimiento post-consulta',
    template: `Hola {{patientName}}, esperamos que se encuentre bien. Queremos saber cómo evoluciona luego de su atención con Dr/a. {{doctorName}}.

Ante cualquier síntoma o duda, comuníquese al instante. Su salud es nuestra prioridad.`,
  },
  {
    id: 'pre-8',
    title: 'Solicitud de reprogramación',
    template: `{{patientName}}, por motivos de fuerza mayor necesitamos reprogramar su turno con Dr/a. {{doctorName}} del {{reservationTime}}.

Le agradeceremos nos confirme su disponibilidad horaria para reagendar a la brevedad. Disculpe las molestias.`,
  },
  {
    id: 'pre-9',
    title: 'Recordatorio de obra social',
    template: `{{patientName}}, le recordamos que debe presentar su credencial de obra social actualizada para su turno del {{reservationTime}} con Dr/a. {{doctorName}}.

Caso contrario, deberá abonar la consulta en forma particular. Ante cualquier duda, consulte con anticipación.`,
  },
  {
    id: 'pre-10',
    title: 'Confirmación de estudio',
    template: `Hola {{patientName}}, le confirmamos su estudio programado para el {{reservationTime}} con Dr/a. {{doctorName}}.

Requisitos: ayuno de 8 horas, llevar estudios previos y orden médica. Preséntese 15 minutos antes.`,
  },
  {
    id: 'pre-11',
    title: 'Agradecimiento post-consulta',
    template: `{{patientName}}, desde {{operatorName}} y todo el equipo de Dr/a. {{doctorName}} le agradecemos su confianza.

Lo esperamos en su próximo control. Recuerde que puede agendar su turno llamándonos o escribiéndonos.`,
  },
  {
    id: 'pre-12',
    title: 'Instrucciones pre-consulta',
    template: `{{patientName}}, para su turno del {{reservationTime}} con Dr/a. {{doctorName}} tenga en cuenta:

• Llegar 15 minutos antes
• Traer DNI y órdenes médicas
• Estudios previos si corresponde
• Lista de medicación actual

Ante cualquier duda, comuníquese con {{operatorName}}.`,
  },
]

export default predefinedMessages
