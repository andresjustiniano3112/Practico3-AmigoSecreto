import { FormLabel } from 'react-bootstrap'
type Props = { htmlFor?: string; children: React.ReactNode }
export default function RequiredLabel({ htmlFor, children }: Props) {
  return <FormLabel htmlFor={htmlFor}>{children} <span className="text-danger">*</span></FormLabel>
}
