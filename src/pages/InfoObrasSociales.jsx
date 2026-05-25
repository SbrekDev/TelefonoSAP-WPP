import { useState } from 'react'
import { useCrud } from '../hooks/useCrud'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import EmptyState from '../components/UI/EmptyState'

const INITIAL_FORM = {
  nombre: '', telefono: '', email: '', sitio_web: '', observaciones: '',
}

export default function InfoObrasSociales() {
  const { items, add, update, remove } = useCrud('info_obras_sociales')
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
      email: item.email, sitio_web: item.sitio_web,
      observaciones: item.observaciones,
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
    if (window.confirm('¿Eliminar esta obra social?')) {
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
          <h1 className="page-header__title">Información de obras sociales</h1>
          <p className="page-header__subtitle">{items.length} obra{items.length !== 1 ? 's' : ''} social{items.length === 1 ? '' : 'es'}</p>
        </div>
        <Button onClick={openAdd}>+ Nueva obra social</Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon="🏥"
          title="Sin obras sociales"
          text="No hay obras sociales registradas. Agrega la información aquí."
          action={<Button onClick={openAdd}>Agregar obra social</Button>}
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
              {item.sitio_web && (
                <div className="card__body-item">
                  <strong>Sitio web:</strong>
                  <span>{item.sitio_web}</span>
                </div>
              )}
              {item.observaciones && (
                <div className="card__body-item">
                  <strong>Observaciones:</strong>
                  <span>{item.observaciones}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar obra social' : 'Nueva obra social'}
        footer={modalFooter}
      >
        <Input
          label="Nombre"
          value={form.nombre}
          onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          placeholder="Nombre de la obra social"
          autoFocus
        />
        <Input
          label="Teléfono"
          type="tel"
          value={form.telefono}
          onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
          placeholder="Ej: 0800-123-4567"
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="obrasocial@ejemplo.com"
        />
        <Input
          label="Sitio web"
          type="url"
          value={form.sitio_web}
          onChange={e => setForm(f => ({ ...f, sitio_web: e.target.value }))}
          placeholder="https://www.ejemplo.com"
        />
        <Input
          label="Observaciones"
          textarea
          value={form.observaciones}
          onChange={e => setForm(f => ({ ...f, observaciones: e.target.value }))}
          placeholder="Notas adicionales..."
        />
      </Modal>
    </section>
  )
}
