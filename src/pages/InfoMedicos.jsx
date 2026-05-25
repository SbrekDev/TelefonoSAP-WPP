import { useState } from 'react'
import { useCrud } from '../hooks/useCrud'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import EmptyState from '../components/UI/EmptyState'

const INITIAL_FORM = {
  nombre: '', especialidad: '', telefono: '', email: '', direccion: '',
}

export default function InfoMedicos() {
  const { items, add, update, remove } = useCrud('info_medicos')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(INITIAL_FORM)

  const openAdd = () => {
    setEditing(null)
    setForm(INITIAL_FORM)
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setForm({
      nombre: item.nombre, especialidad: item.especialidad,
      telefono: item.telefono, email: item.email, direccion: item.direccion,
    })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.nombre.trim()) return
    if (editing) {
      update(editing.id, form)
    } else {
      add(form)
    }
    setModalOpen(false)
    setForm(INITIAL_FORM)
    setEditing(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este médico?')) {
      remove(id)
    }
  }

  const modalFooter = (
    <>
      <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
      <Button onClick={handleSave} disabled={!form.nombre.trim()}>
        {editing ? 'Guardar cambios' : 'Agregar'}
      </Button>
    </>
  )

  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Información de médicos</h1>
          <p className="page-header__subtitle">{items.length} médico{items.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={openAdd}>+ Nuevo médico</Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon="👨‍⚕️"
          title="Sin médicos"
          text="No hay médicos registrados. Agrega la información de tus médicos."
          action={<Button onClick={openAdd}>Agregar médico</Button>}
        />
      ) : (
        <div className="card-grid">
          {items.map(item => (
            <Card
              key={item.id}
              title={item.nombre}
              actions={
                <>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>Editar</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>Eliminar</Button>
                </>
              }
            >
              {item.especialidad && (
                <div className="card__body-item">
                  <strong>Especialidad:</strong>
                  <span>{item.especialidad}</span>
                </div>
              )}
              {item.telefono && (
                <div className="card__body-item">
                  <strong>Teléfono:</strong>
                  <span>{item.telefono}</span>
                </div>
              )}
              {item.email && (
                <div className="card__body-item">
                  <strong>Email:</strong>
                  <span>{item.email}</span>
                </div>
              )}
              {item.direccion && (
                <div className="card__body-item">
                  <strong>Dirección:</strong>
                  <span>{item.direccion}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar médico' : 'Nuevo médico'}
        footer={modalFooter}
      >
        <Input
          label="Nombre"
          value={form.nombre}
          onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          placeholder="Nombre completo"
          autoFocus
        />
        <Input
          label="Especialidad"
          value={form.especialidad}
          onChange={e => setForm(f => ({ ...f, especialidad: e.target.value }))}
          placeholder="Ej: Cardiología"
        />
        <Input
          label="Teléfono"
          type="tel"
          value={form.telefono}
          onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
          placeholder="Ej: 11 1234-5678"
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="medico@ejemplo.com"
        />
        <Input
          label="Dirección"
          value={form.direccion}
          onChange={e => setForm(f => ({ ...f, direccion: e.target.value }))}
          placeholder="Dirección del consultorio"
        />
      </Modal>
    </section>
  )
}
