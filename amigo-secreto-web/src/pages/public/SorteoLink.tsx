import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Card, Table, Button, Alert } from 'react-bootstrap'
import { getPendientes, identificar } from '../../services/public'
import type { PublicPendiente } from '../../types/api'

export default function SorteoLink() {
  const { hash } = useParams()
  const navigate = useNavigate()
  const [rows, setRows] = useState<PublicPendiente[]>([])
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    if (!hash) return
    setError(null); setOk(null); setLoading(true)
    try {
      const data = await getPendientes(hash)
      setRows(data)
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Link inválido o expirado')
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [hash])

  const onIdentificar = async (idParticipante: number) => {
    if (!hash) return
    setError(null); setOk(null)
    try {
      const res = await identificar(hash, idParticipante)
      setOk('¡Listo! Te identificaste. Ahora abrí tu bolillo.')
      // Navegar directo:
      navigate(`/public/bolillo/${res.bolilloHash}`)
    } catch (e: any) {
      setError(e?.response?.data?.error || 'No se pudo identificar')
    }
  }

  return (
    <Container className="mt-3">
      <Card>
        <Card.Header><strong>Amigo Secreto – Identificate</strong></Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {ok && <Alert variant="success">{ok}</Alert>}

          <p className="text-muted">Elegí tu nombre de la lista para marcarte como conectado.</p>
          <Table striped hover>
            <thead>
              <tr><th>#</th><th>Nombre</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p.id}>
                  <td>{i+1}</td>
                  <td>{p.nombre}</td>
                  <td className="text-end">
                    <Button size="sm" onClick={() => onIdentificar(p.id)} disabled={loading}>
                      Soy yo
                    </Button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={3} className="text-center text-muted">No hay pendientes o ya se identificaron todos.</td></tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}
