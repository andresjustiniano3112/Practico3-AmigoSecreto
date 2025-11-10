import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'

export default function Login() {
  const { doLogin, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6} lg={5}>
          <Card>
            <Card.Body>
              <h3 className="mb-3">Iniciar sesión</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={(e)=>{e.preventDefault(); doLogin(email, password)}}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
                </Form.Group>
                <Button type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
