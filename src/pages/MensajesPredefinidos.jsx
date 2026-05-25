import { useState, useMemo, useCallback, useRef } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useCustomMessages } from '../hooks/useCustomMessages'
import { renderTemplate } from '../utils/templateEngine'
import predefinedMessages from '../data/predefinedMessages'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
import EmptyState from '../components/UI/EmptyState'
import Accordion from '../components/UI/Accordion'
import Snackbar from '../components/UI/Snackbar'
import PatientForm from '../components/MensajesPredefinidos/PatientForm'

const INITIAL_MODAL_FORM = { titulo: '', template: '' }

export default function MensajesPredefinidos() {
  const [patientData, setPatientData] = useState({
    patientName: '',
    patientDocument: '',
    reservationTime: '',
    doctorName: '',
    medicalRecord: '',
  })
  const [search, setSearch] = useState('')
  const [snackbar, setSnackbar] = useState({ message: '', visible: false })
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [modalForm, setModalForm] = useState(INITIAL_MODAL_FORM)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewingMessage, setViewingMessage] = useState(null)

  const [operatorName] = useLocalStorage('global_name', '')
  const { items: customMessages, loading, add, update, remove } = useCustomMessages()
  const snackbarTimerRef = useRef(null)

  const showSnackbar = useCallback((message) => {
    clearTimeout(snackbarTimerRef.current)
    setSnackbar({ message, visible: true })
    snackbarTimerRef.current = setTimeout(() => {
      setSnackbar({ message: '', visible: false })
    }, 2500)
  }, [])

  const templateData = useMemo(() => ({
    ...patientData,
    operatorName: operatorName || 'Operador',
  }), [patientData, operatorName])

  const render = useCallback((template) => renderTemplate(template, templateData), [templateData])

  const filteredPredefined = useMemo(() => {
    const q = search.toLowerCase()
    return predefinedMessages.filter((m) =>
      m.title.toLowerCase().includes(q) || m.template.toLowerCase().includes(q)
    )
  }, [search])

  const filteredCustom = useMemo(() => {
    const q = search.toLowerCase()
    return customMessages.filter((m) =>
      m.titulo.toLowerCase().includes(q) || m.template.toLowerCase().includes(q)
    )
  }, [search, customMessages])

  const handleApply = useCallback((data) => {
    setPatientData(data)
    showSnackbar('Datos aplicados correctamente')
  }, [showSnackbar])

  const handleCopy = useCallback((text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showSnackbar('¡Copiado al portapapeles!')
      })
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      showSnackbar('¡Copiado al portapapeles!')
    }
  }, [showSnackbar])

  const openAddModal = () => {
    setEditing(null)
    setModalForm(INITIAL_MODAL_FORM)
    setModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditing(item)
    setModalForm({ titulo: item.titulo, template: item.template })
    setModalOpen(true)
  }

  const openViewModal = useCallback((msg) => {
    setViewingMessage(msg)
    setViewModalOpen(true)
  }, [])

  const closeViewModal = useCallback(() => {
    setViewModalOpen(false)
    setViewingMessage(null)
  }, [])

  const handleSaveCustom = async () => {
    if (!modalForm.titulo.trim() || !modalForm.template.trim()) return
    if (editing) {
      await update(editing.id, modalForm)
      showSnackbar('Mensaje actualizado')
    } else {
      await add(modalForm)
      showSnackbar('Mensaje creado')
    }
    setModalOpen(false)
    setEditing(null)
    setModalForm(INITIAL_MODAL_FORM)
  }

  const handleDeleteCustom = async (id) => {
    if (!window.confirm('¿Eliminar este mensaje?')) return
    await remove(id)
    showSnackbar('Mensaje eliminado')
  }

  const handleEditFromView = useCallback(() => {
    const msg = viewingMessage
    closeViewModal()
    if (msg) openEditModal(msg)
  }, [viewingMessage, closeViewModal])

  const modalFooter = (
    <>
      <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
      <Button
        onClick={handleSaveCustom}
        disabled={!modalForm.titulo.trim() || !modalForm.template.trim()}
      >
        {editing ? 'Guardar cambios' : 'Crear'}
      </Button>
    </>
  )

  const isViewingCustom = viewingMessage && 'titulo' in viewingMessage

  const viewModalFooter = (
    <>
      {isViewingCustom && (
        <Button variant="ghost" onClick={handleEditFromView}>Editar</Button>
      )}
      <Button onClick={closeViewModal}>Cerrar</Button>
    </>
  )

  const totalCustom = customMessages.length

  return (
    <section className="page-enter">

      <Accordion
        title="Datos a completar"
        defaultOpen={window.innerWidth >= 640}
      >
        <PatientForm onApply={handleApply} />
      </Accordion>

      <Input
        label="Buscar mensajes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por título o contenido..."
        className="search-input"
      />

      <Accordion
        title="Mensajes predeterminados"
        defaultOpen={true}
        badge={filteredPredefined.length}
      >
        {filteredPredefined.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="Sin resultados"
            text="No hay mensajes predeterminados que coincidan con tu búsqueda."
          />
        ) : (
          <div className="message-list">
            {filteredPredefined.map((msg) => (
              <div key={msg.id} className="message-list-item">
                <span className="message-list-item__title">{msg.title}</span>
                <div className="message-list-item__actions">
                  <Button size="sm" variant="ghost" onClick={() => openViewModal(msg)}>
                    Ver contenido
                  </Button>
                  <Button size="sm" onClick={() => handleCopy(render(msg.template))}>
                    Copiar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Accordion>

      <Accordion
        title="Mensajes creados por el usuario"
        defaultOpen={false}
        badge={totalCustom}
      >
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <div className="accordion-toolbar">
              <Button onClick={openAddModal}>+ Nuevo mensaje</Button>
            </div>

            {filteredCustom.length === 0 && totalCustom === 0 ? (
              <EmptyState
                icon="✏️"
                title="Sin mensajes personalizados"
                text="Crea tus propias plantillas de mensajes para usarlas rápidamente."
                action={<Button onClick={openAddModal}>Crear mensaje</Button>}
              />
            ) : filteredCustom.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="Sin resultados"
                text="No hay mensajes personalizados que coincidan con tu búsqueda."
              />
            ) : (
              <div className="message-list">
                {filteredCustom.map((msg) => (
                  <div key={msg.id} className="message-list-item">
                    <span className="message-list-item__title">{msg.titulo}</span>
                    <div className="message-list-item__actions">
                      <Button size="sm" variant="ghost" onClick={() => openViewModal(msg)}>
                        Ver contenido
                      </Button>
                      <Button size="sm" onClick={() => handleCopy(render(msg.template))}>
                        Copiar
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteCustom(msg.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Accordion>

      <Modal
        open={viewModalOpen}
        onClose={closeViewModal}
        title={viewingMessage?.title || viewingMessage?.titulo || ''}
        footer={viewModalFooter}
      >
        <div className="message-view-content">
          {viewingMessage && render(viewingMessage.template)}
        </div>
      </Modal>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar mensaje' : 'Nuevo mensaje'}
        footer={modalFooter}
      >
        <Input
          label="Título"
          value={modalForm.titulo}
          onChange={(e) => setModalForm((f) => ({ ...f, titulo: e.target.value }))}
          placeholder="Nombre del mensaje"
          autoFocus
        />
        <Input
          label="Plantilla del mensaje"
          textarea
          value={modalForm.template}
          onChange={(e) => setModalForm((f) => ({ ...f, template: e.target.value }))}
          placeholder={`Escribe el mensaje aquí...\n\nVariables disponibles:\n{{patientName}} {{patientDocument}}\n{{reservationTime}} {{doctorName}}\n{{operatorName}}`}
          style={{ minHeight: 140 }}
        />
      </Modal>

      <Snackbar message={snackbar.message} visible={snackbar.visible} />
    </section>
  )
}
