import { useState } from 'react'
import { FileText } from 'lucide-react'
import { useGenerate } from '../hooks/useGenerate'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Select, GenerateButton } from '../components/FormField'
import OutputBox from '../components/OutputBox'

export default function QuoteFollowUp() {
  const [fields, setFields] = useState({ businessName: '', clientName: '', service: '', quoteAmount: '', daysSince: '', tone: 'warm' })
  const { output, loading, error, generate } = useGenerate('quote')
  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))

  return (
    <ToolCard icon={FileText} title="Quote Follow-Up" description="Sent a quote and heard nothing? A well-timed follow-up can be the difference between winning and losing the job.">
      <Row>
        <Field label="Your Business Name"><Input placeholder="e.g. Elite Electrical" value={fields.businessName} onChange={e => set('businessName', e.target.value)} /></Field>
        <Field label="Client Name *"><Input placeholder="e.g. Sarah Thompson" value={fields.clientName} onChange={e => set('clientName', e.target.value)} /></Field>
      </Row>
      <Field label="Service / Job Quoted *"><Input placeholder="e.g. Full kitchen rewire and switchboard upgrade" value={fields.service} onChange={e => set('service', e.target.value)} /></Field>
      <Row>
        <Field label="Quote Amount ($AUD)"><Input type="number" placeholder="e.g. 4800" value={fields.quoteAmount} onChange={e => set('quoteAmount', e.target.value)} /></Field>
        <Field label="Days Since Sent"><Input type="number" placeholder="e.g. 5" value={fields.daysSince} onChange={e => set('daysSince', e.target.value)} /></Field>
      </Row>
      <Field label="Tone">
        <Select value={fields.tone} onChange={e => set('tone', e.target.value)}>
          <option value="warm">Warm & Friendly</option>
          <option value="professional">Professional & Direct</option>
          <option value="create-urgency">Create Urgency (limited availability)</option>
        </Select>
      </Field>
      <GenerateButton loading={loading} disabled={!fields.clientName || !fields.service} label="Generate Quote Follow-Up" loadingLabel="Writing your email…" onClick={() => generate(fields)} />
      <OutputBox text={output} loading={loading} error={error} />
    </ToolCard>
  )
}
