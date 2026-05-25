import { useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'

const INITIAL = {
  patientName: '',
  patientDocument: '',
  reservationTime: '',
  doctorName: '',
  medicalRecord: '',
}

export default function PatientForm({ onApply }) {
  const [data, setData] = useState(INITIAL)

  const handleChange = (field) => (e) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onApply(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="patient-form__fields">
        <Input
          label="Nombre y apellido"
          value={data.patientName}
          onChange={handleChange('patientName')}
          placeholder="Ej: Juan Pérez"
          autoComplete="name"
        />
        <Input
          label="DNI / CI"
          value={data.patientDocument}
          onChange={handleChange('patientDocument')}
          placeholder="Ej: 12345678"
          autoComplete="off"
        />
        <Input
          label="Horario de reserva"
          value={data.reservationTime}
          onChange={handleChange('reservationTime')}
          placeholder="Ej: 15/05 10:30 hs"
          autoComplete="off"
        />
        <Input
          label="Nombre y apellido del médico"
          value={data.doctorName}
          onChange={handleChange('doctorName')}
          placeholder="Ej: Dr. Rodríguez"
          autoComplete="off"
        />
        <Input
          label="Historia clínica"
          value={data.medicalRecord}
          onChange={handleChange('medicalRecord')}
          placeholder="Ej: HC-48291"
          autoComplete="off"
        />
      </div>
      <div className="patient-form__actions">
        <Button type="submit">
          Aplicar
        </Button>
      </div>
    </form>
  )
}
