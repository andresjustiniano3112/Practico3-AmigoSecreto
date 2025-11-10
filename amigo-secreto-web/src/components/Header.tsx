import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { isLogged } from '../utils/token'

export default function Header() {
  const { doLogout } = useAuth()
  const location = useLocation()
  const logged = isLogged()

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Amigo Secreto</Navbar.Brand>
        <Nav className="me-auto">
          {logged && <Nav.Link as={Link} to="/sorteos" active={location.pathname === '/sorteos'}>Sorteos</Nav.Link>}
        </Nav>
        <Nav>
          {!logged ? (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Registro</Nav.Link>
            </>
          ) : (
            <Button variant="outline-danger" onClick={doLogout}>Salir</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}
