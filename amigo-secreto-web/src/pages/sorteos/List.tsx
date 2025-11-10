import { useEffect, useState } from 'react'
import { Container, Table, Button, Modal, Form, Row, Col, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { Sorteo } from '../../types/api'
import { getSorteos, createSorteo, deleteSorteo } from '../../services/sorteos'

export default function SorteosList() {
  const [rows, setRows] = useState<Sorteo[]>([])
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getSorteos()
      setRows(data)
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Error al cargar sorteos')
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null); setOk(null)
    try {
      if (!nombre || !fecha) { setError('Completa nombre y fecha'); return }
      await createSorteo({ nombre, fecha })
      setShow(false)
      setNombre(''); setFecha('')
      setOk('Sorteo creado')
      load()
    } catch (e: any) {
      setError(e?.response?.data?.error || 'No se pudo crear el sorteo')
    }
  }

  const onDelete = async (id: number) => {
    if (!confirm('¿Eliminar sorteo?')) return
    setError(null); setOk(null)
    try {
      await deleteSorteo(id)
      setOk('Sorteo eliminado')
      load()
    } catch (e: any) {
      setError(e?.response?.data?.error || 'No se pudo eliminar')
    }
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
        <h3>Mis sorteos</h3>
        <div className="d-flex gap-2">
          <Button size="sm" variant="secondary" onClick={load} disabled={loading}>Refrescar</Button>
          <Button size="sm" onClick={()=>setShow(true)}>Nuevo sorteo</Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {ok && <Alert variant="success">{ok}</Alert>}

      <Table striped hover>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Fecha</th><th>Iniciado</th><th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td><Link to={`/sorteos/${s.id}`}>{s.nombre}</Link></td>
              <td>{s.fecha}</td>
              <td>{s.iniciado ? 'Sí' : 'No'}</td>
              <td className="text-end">
                <Button size="sm" as={Link} to={`/sorteos/${s.id}`} className="me-2">Abrir</Button>
                <Button size="sm" variant="outline-danger" onClick={()=>onDelete(s.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && !loading && (
            <tr><td colSpan={5} className="text-center">Sin datos</td></tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={()=>setShow(false)}>
        <Form onSubmit={onCreate}>
          <Modal.Header closeButton><Modal.Title>Nuevo sorteo</Modal.Title></Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Label>Nombre</Form.Label>
                <Form.Control value={nombre} onChange={e=>setNombre(e.target.value)} required />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" value={fecha} onChange={e=>setFecha(e.target.value)} required />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>Cancelar</Button>
            <Button type="submit">Crear</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}
