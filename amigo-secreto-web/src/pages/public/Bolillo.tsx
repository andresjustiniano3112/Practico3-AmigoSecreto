import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap'
import { getBolillo, saveWishlist } from '../../services/public'
import type { BolilloResponse } from '../../types/api'

export default function Bolillo() {
  const { hash } = useParams()
  const [data, setData] = useState<BolilloResponse | null>(null)
  const [wishlist, setWishlist] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // 🔗 construimos el link absoluto a este mismo bolillo
  const myLink = useMemo(() => {
    if (!hash) return ''
    return `${window.location.origin}/public/bolillo/${hash}`
  }, [hash])

  const load = async () => {
    if (!hash) return
    setError(null); setOk(null); setLoading(true)
    try {
      const d = await getBolillo(hash)
      setData(d)
      setWishlist(d.yo?.wishlist ?? '')
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Link inválido o expirado')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [hash])

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hash) return
    setError(null); setOk(null); setLoading(true)
    try {
      await saveWishlist(hash, wishlist)
      setOk('Wishlist guardada')
    } catch (e: any) {
      setError(e?.response?.data?.error || 'No se pudo guardar')
    } finally { setLoading(false) }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(myLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // fallback simple
      setCopied(false)
    }
  }

  if (!data) return (
    <Container className="mt-3">
      {error ? <Alert variant="danger">{error}</Alert> : 'Cargando…'}
    </Container>
  )

  return (
    <Container className="mt-3">
      {error && <Alert variant="danger">{error}</Alert>}
      {ok && <Alert variant="success">{ok}</Alert>}
      {copied && <Alert variant="success">Link copiado</Alert>}

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>Tu link de acceso a este bolillo</strong>
              <Button size="sm" variant="outline-light" onClick={copyLink}>Copiar</Button>
            </Card.Header>
            <Card.Body>
              <code style={{ wordBreak: 'break-all' }}>{myLink}</code>
              <div className="text-muted small mt-2">
                Guardá este link. Solo sirve para volver a entrar a esta pantalla.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header><strong>Mi información</strong></Card.Header>
            <Card.Body>
              <div className="mb-2"><strong>Nombre:</strong> {data.yo.nombre}</div>
              <Form onSubmit={onSave}>
                <Form.Label>Mi wishlist</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={wishlist}
                  onChange={e=>setWishlist(e.target.value)}
                  placeholder="Ideas de regalos, talles, gustos, etc."
                />
                <div className="mt-2 d-flex gap-2">
                  <Button type="submit" disabled={loading}>Guardar</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header><strong>Mi receptor</strong></Card.Header>
            <Card.Body>
              {data.receptor ? (
                <>
                  <div className="mb-2"><strong>Nombre:</strong> {data.receptor.nombre}</div>
                  <div>
                    <strong>Wishlist:</strong>
                    <div className="mt-2">
                      {data.receptor.wishlist ? (
                        <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{data.receptor.wishlist}</pre>
                      ) : (
                        <Badge bg="secondary">Aún no cargó su wishlist</Badge>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-muted">Aún no hay receptor asignado.</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
