import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { register } from '../../services/auth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOk(false); setError(null)
    try {
      await register({ email, password, nombreCompleto })
      setOk(true)
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Error en registro')
    }
  }

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6} lg={5}>
          <Card>
            <Card.Body>
              <h3 className="mb-3">Registro</h3>
              {ok && <Alert variant="success">Usuario creado. Ya podés iniciar sesión.</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control value={nombreCompleto} onChange={e=>setNombreCompleto(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
                </Form.Group>
                <Button type="submit">Crear cuenta</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
