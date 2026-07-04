import { useState } from 'react'
import { Receipt } from 'lucide-react'
import { useGenerate } from '../hooks/useGenerate'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Select, GenerateButton } from '../components/FormField'
import OutputBox from '../components/OutputBox'

export default function InvoiceChaser() {
  const [fields, setFields] = useState({
    businessName: '', clientName: '', invoiceNum: '',
    amount: '', dueDate: '', daysOverdue: '', tone: 'firm-but-polite',
  })
  const { output, loading, error, generate } = useGenerate('invoice')
  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))
  const canSubmit = fields.clientName && fields.amount

  return (
    <ToolCard
      icon={Receipt}
      title="Invoice Chaser"
      description="Stop chasing invoices manually. Fill in the details and get a professional payment follow-up email ready to send in seconds."
    >
      <Row>
        <Field label="Your Business Name">
          <Input placeholder="e.g. Smith Plumbing" value={fields.businessName} onChange={e => set('businessName', e.target.value)} />
        </Field>
        <Field label="Client / Company Name *">
          <Input placeholder="e.g. Jones Cafe" value={fields.clientName} onChange={e => set('clientName', e.target.value)} />
        </Field>
      </Row>
      <Row>
        <Field label="Invoice Number">
          <Input placeholder="e.g. INV-0042" value={fields.invoiceNum} onChange={e => set('invoiceNum', e.target.value)} />
        </Field>
        <Field label="Amount Owing ($AUD) *">
          <Input type="number" placeholder="e.g. 2500" value={fields.amount} onChange={e => set('amount', e.target.value)} />
        </Field>
      </Row>
      <Row>
        <Field label="Original Due Date">
          <Input type="date" value={fields.dueDate} onChange={e => set('dueDate', e.target.value)} />
        </Field>
        <Field label="Days Overdue">
          <Input type="number" placeholder="e.g. 14" value={fields.daysOverdue} onChange={e => set('daysOverdue', e.target.value)} />
        </Field>
      </Row>
      <Field label="Email Tone">
        <Select value={fields.tone} onChange={e => set('tone', e.target.value)}>
          <option value="friendly-reminder">Friendly Reminder (first nudge)</option>
          <option value="firm-but-polite">Firm but Polite (standard)</option>
          <option value="urgent">Urgent (seriously overdue)</option>
          <option value="final-notice">Final Notice (before action)</option>
        </Select>
      </Field>
      <GenerateButton loading={loading} disabled={!canSubmit} label="Generate Invoice Chaser Email" loadingLabel="Writing your email…" onClick={() => generate(fields)} />
      <OutputBox text={output} loading={loading} error={error} />
    </ToolCard>
  )
}
