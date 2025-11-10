import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button, Table, Alert, Badge } from 'react-bootstrap'
import type { Participante, Sorteo, SortearResponse } from '../../types/api'
import { getSorteos, getParticipantes, addParticipante, sortear } from '../../services/sorteos'

export default function SorteoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const idSorteo = Number(id)

  const [sorteo, setSorteo] = useState<Sorteo | null>(null)
  const [parts, setParts] = useState<Participante[]>([])
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)
  const [sortResult, setSortResult] = useState<SortearResponse | null>(null)

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const sorteos = await getSorteos()
      const s = sorteos.find(x => x.id === idSorteo)
      if (!s) { navigate('/sorteos'); return }
      setSorteo(s)
      const p = await getParticipantes(idSorteo)
      setParts(p)
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Error al cargar')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ if (Number.isFinite(idSorteo)) load() }, [idSorteo])

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null); setOk(null)
    try {
      if (!nombre.trim()) { setError('Nombre requerido'); return }
      await addParticipante(idSorteo, nombre.trim())
      setNombre(''); setOk('Participante agregado')
      await load()
    } catch (e: any) {
      setError(e?.response?.data?.error || 'No se pudo agregar')
    }
  }

  const onSortear = async () => {
    if (!confirm('¿Confirmás ejecutar el sorteo? Esto lo marca como iniciado.')) return
    setError(null); setOk(null)
    try {
      const res = await sortear(idSorteo) // solo devuelve sorteoHash y urlSorteo
      setSortResult(res)
      setOk('Sorteo realizado')
      await load()
    } catch (e: any) {
      setError(e?.response?.data?.error || 'No se pudo sortear')
    }
  }

  const pendientes = useMemo(()=> parts.filter(p=>!p.identificado).length, [parts])

  if (!sorteo) return <Container className="mt-3">Cargando…</Container>

  return (
    <Container className="mt-3">
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">{sorteo.nombre}</h4>
                  <div className="text-muted">Fecha: {sorteo.fecha}</div>
                </div>
                <div>
                  {sorteo.iniciado
                    ? <Badge bg="success">Iniciado</Badge>
                    : <Badge bg="secondary">No iniciado</Badge>
                  }
                </div>
              </div>
            </Card.Body>
          </Card>

          {error && <Alert variant="danger">{error}</Alert>}
          {ok && <Alert variant="success">{ok}</Alert>}

          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>Participantes</strong>
              <span className="text-muted small">Pendientes de identificar: {pendientes}</span>
            </Card.Header>
            <Card.Body>
              <Form className="mb-3" onSubmit={onAdd}>
                <Row className="g-2 align-items-end">
                  <Col md={6}>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Ana" />
                  </Col>
                  <Col md="auto">
                    <Button type="submit" disabled={sorteo.iniciado}>Agregar</Button>
                  </Col>
                </Row>
              </Form>

              <Table striped hover>
                <thead><tr><th>#</th><th>Nombre</th><th>Identificado</th></tr></thead>
                <tbody>
                  {parts.map((p,i)=>(
                    <tr key={p.id}>
                      <td>{i+1}</td>
                      <td>{p.nombre}</td>
                      <td>{p.identificado ? 'Sí' : 'No'}</td>
                    </tr>
                  ))}
                  {parts.length === 0 && (
                    <tr><td colSpan={3} className="text-center">Sin participantes</td></tr>
                  )}
                </tbody>
              </Table>

              <div className="d-flex gap-2">
                <Button variant="primary" onClick={onSortear} disabled={sorteo.iniciado || parts.length < 2}>
                  {sorteo.iniciado ? 'Ya iniciado' : 'Sortear'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header><strong>Link público del sorteo</strong></Card.Header>
            <Card.Body>
              {!sortResult && (
                <div className="text-muted">
                  Ejecutá “Sortear” para generar el link público del sorteo.
                </div>
              )}
              {sortResult && (
                <div className="mb-2">
                  <div className="small text-muted mb-1">Link público:</div>
                  <code>http://localhost:5173/public/sorteos/{sortResult.sorteoHash}</code>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
