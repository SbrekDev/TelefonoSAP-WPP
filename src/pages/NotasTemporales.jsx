import { useState } from 'react'
import { useCrud } from '../hooks/useCrud'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import EmptyState from '../components/UI/EmptyState'

const INITIAL_FORM = { titulo: '', contenido: '' }

function formatDate(ts) {
  const d = new Date(Number(ts))
  return d.toLocaleDateString('es-AR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function NotasTemporales() {
  const { items, add, update, remove } = useCrud('notas_temporales')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(INITIAL_FORM)

  const sorted = [...items].sort((a, b) => Number(b.fecha || b.id) - Number(a.fecha || a.id))

  const openAdd = () => {
    setEditing(null)
    setForm(INITIAL_FORM)
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setForm({ titulo: item.titulo, contenido: item.contenido })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.titulo.trim()) return
    if (editing) {
      update(editing.id, form)
    } else {
      add({ ...form, fecha: Date.now().toString() })
    }
    setModalOpen(false)
    setForm(INITIAL_FORM)
    setEditing(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta nota temporal?')) {
      remove(id)
    }
  }

  const modalFooter = (
    <>
      <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
      <Button onClick={handleSave} disabled={!form.titulo.trim()}>
        {editing ? 'Guardar cambios' : 'Agregar'}
      </Button>
    </>
  )

  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Notas Temporales</h1>
          <p className="page-header__subtitle">{items.length} nota{items.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={openAdd}>+ Nueva nota</Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon="📝"
          title="Sin notas"
          text="No hay notas temporales. Crea una para recordar algo importante."
          action={<Button onClick={openAdd}>Crear nota</Button>}
        />
      ) : (
        <div className="card-grid">
          {sorted.map(item => (
            <Card
              key={item.id}
              title={item.titulo}
              actions={
                <>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>Editar</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>Eliminar</Button>
                </>
              }
            >
              {item.contenido && <div className="message-preview">{item.contenido}</div>}
              <div className="note-date" style={{ marginTop: item.contenido ? '0.5rem' : 0 }}>
                {formatDate(item.fecha || item.id)}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar nota' : 'Nueva nota'}
        footer={modalFooter}
      >
        <Input
          label="Título"
          value={form.titulo}
          onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
          placeholder="Título de la nota"
          autoFocus
        />
        <Input
          label="Contenido"
          textarea
          value={form.contenido}
          onChange={e => setForm(f => ({ ...f, contenido: e.target.value }))}
          placeholder="Escribe tu nota aquí..."
        />
      </Modal>
    </section>
  )
}
