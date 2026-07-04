import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { useGenerate } from '../hooks/useGenerate'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Textarea, Select, GenerateButton } from '../components/FormField'
import OutputBox from '../components/OutputBox'

export default function ComplaintResponder() {
  const [fields, setFields] = useState({ businessName: '', customerName: '', channel: 'email', complaint: '', resolution: '' })
  const { output, loading, error, generate } = useGenerate('complaint')
  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))

  return (
    <ToolCard icon={MessageSquare} title="Complaint Responder" description="Handle customer complaints confidently. Get a professional, empathetic response that de-escalates and keeps the relationship intact.">
      <Row>
        <Field label="Your Business Name"><Input placeholder="e.g. Bright Cleaning" value={fields.businessName} onChange={e => set('businessName', e.target.value)} /></Field>
        <Field label="Customer Name"><Input placeholder="e.g. Mrs. Johnson" value={fields.customerName} onChange={e => set('customerName', e.target.value)} /></Field>
      </Row>
      <Field label="Response Channel">
        <Select value={fields.channel} onChange={e => set('channel', e.target.value)}>
          <option value="email">Email</option>
          <option value="letter">Formal Letter</option>
          <option value="sms">SMS / Text</option>
          <option value="facebook">Facebook / Social Media</option>
        </Select>
      </Field>
      <Field label="Customer Complaint *">
        <Textarea placeholder="Describe or paste what the customer said…" style={{ minHeight: 110 }} value={fields.complaint} onChange={e => set('complaint', e.target.value)} />
      </Field>
      <Field label="Your Proposed Resolution">
        <Textarea placeholder="e.g. We'll refund the job, redo the work, offer a discount…" style={{ minHeight: 70 }} value={fields.resolution} onChange={e => set('resolution', e.target.value)} />
      </Field>
      <GenerateButton loading={loading} disabled={!fields.complaint} label="Generate Complaint Response" loadingLabel="Writing your response…" onClick={() => generate(fields)} />
      <OutputBox text={output} loading={loading} error={error} />
    </ToolCard>
  )
}
