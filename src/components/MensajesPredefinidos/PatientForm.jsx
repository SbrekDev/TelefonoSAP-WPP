import { useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { toTitleCase, toUpperCase } from '../../utils/formatting'

const INITIAL = {
  patientName: '',
  patientDocument: '',
  reservationDate: '',
  reservationTime: '',
  doctorName: '',
  insuranceProvider: '',
  medicalRecord: '',
}

export default function PatientForm({ onApply }) {
  const [data, setData] = useState(INITIAL)

  const handleChange = (field) => (e) => {
    const raw = e.target.value
    let formatted = raw
    if (field === 'patientName' || field === 'doctorName') {
      formatted = toTitleCase(raw)
    } else if (field === 'insuranceProvider') {
      formatted = toUpperCase(raw)
    }
    setData((prev) => ({ ...prev, [field]: formatted }))
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
        <div className="patient-form__row patient-form__row--pair">
          <Input
            label="Fecha de reserva"
            value={data.reservationDate}
            onChange={handleChange('reservationDate')}
            placeholder="Ej: 15/05/2026"
            autoComplete="off"
          />
          <Input
            label="Horario de reserva"
            value={data.reservationTime}
            onChange={handleChange('reservationTime')}
            placeholder="Ej: 10:30 hs"
            autoComplete="off"
          />
        </div>
        <Input
          label="Nombre y apellido del médico"
          value={data.doctorName}
          onChange={handleChange('doctorName')}
          placeholder="Ej: Dr. Rodríguez"
          autoComplete="off"
        />
        <div className="patient-form__row patient-form__row--pair">
          <Input
            label="Obra social"
            value={data.insuranceProvider}
            onChange={handleChange('insuranceProvider')}
            placeholder="Ej: OSDE"
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
      </div>
      <div className="patient-form__actions">
        <Button type="submit">
          Aplicar
        </Button>
      </div>
    </form>
  )
}
