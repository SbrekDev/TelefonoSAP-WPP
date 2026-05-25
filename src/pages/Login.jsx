import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate('/', { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 300))

    const success = login(username, password)
    if (success) {
      navigate('/', { replace: true })
    } else {
      setError('Credenciales incorrectas')
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__icon">📞</div>
        <h1>Proyecto Teléfono</h1>
        <p className="login-card__subtitle">Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="login-error" role="alert">{error}</div>}

          <Input
            label="Usuario"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            autoComplete="username"
            autoFocus
            required
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            required
          />

          <div className="form-actions">
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading || !username || !password}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
