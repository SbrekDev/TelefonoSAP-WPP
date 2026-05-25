import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout/Layout'

const Login = lazy(() => import('./pages/Login'))
const MensajesPredefinidos = lazy(() => import('./pages/MensajesPredefinidos'))
const NotasTemporales = lazy(() => import('./pages/NotasTemporales'))
const InfoMedicos = lazy(() => import('./pages/InfoMedicos'))
const InfoObrasSociales = lazy(() => import('./pages/InfoObrasSociales'))
const InfoContactos = lazy(() => import('./pages/InfoContactos'))

function Loading() {
  return (
    <div className="loading-screen">
      <div className="spinner" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/mensajes-predefinidos" replace />} />
          <Route path="mensajes-predefinidos" element={<MensajesPredefinidos />} />
          <Route path="notas-temporales" element={<NotasTemporales />} />
          <Route path="info-medicos" element={<InfoMedicos />} />
          <Route path="info-obras-sociales" element={<InfoObrasSociales />} />
          <Route path="info-contactos" element={<InfoContactos />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
