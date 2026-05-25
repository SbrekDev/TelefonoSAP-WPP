import { useState } from 'react'
import { useCrud } from '../hooks/useCrud'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import EmptyState from '../components/UI/EmptyState'

const INITIAL_FORM = {
  nombre: '', telefono: '', email: '', direccion: '', notas: '',
}

export default function InfoContactos() {
  const { items, add, update, remove } = useCrud('info_contactos')
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
      nombre: item.nombre, telefono: item.telefono,
      email: item.email, direccion: item.direccion, notas: item.notas,
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
    if (window.confirm('¿Eliminar este contacto?')) {
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
          <h1 className="page-header__title">Información de contactos</h1>
          <p className="page-header__subtitle">{items.length} contacto{items.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={openAdd}>+ Nuevo contacto</Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon="📇"
          title="Sin contactos"
          text="No hay contactos registrados. Agrega tus contactos importantes."
          action={<Button onClick={openAdd}>Agregar contacto</Button>}
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
              {item.notas && (
                <div className="card__body-item">
                  <strong>Notas:</strong>
                  <span>{item.notas}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar contacto' : 'Nuevo contacto'}
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
          placeholder="contacto@ejemplo.com"
        />
        <Input
          label="Dirección"
          value={form.direccion}
          onChange={e => setForm(f => ({ ...f, direccion: e.target.value }))}
          placeholder="Dirección"
        />
        <Input
          label="Notas"
          textarea
          value={form.notas}
          onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
          placeholder="Notas adicionales..."
        />
      </Modal>
    </section>
  )
}
