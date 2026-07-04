import { useState } from 'react'
import { FileCheck } from 'lucide-react'
import { useGenerate } from '../hooks/useGenerate'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Textarea, GenerateButton } from '../components/FormField'
import OutputBox from '../components/OutputBox'

export default function BASAssistant() {
  const [fields, setFields] = useState({ businessName: '', period: '', totalSales: '', gstCollected: '', gstPaid: '', wages: '', questions: '' })
  const { output, loading, error, generate } = useGenerate('bas')
  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))

  return (
    <ToolCard icon={FileCheck} title="BAS Assistant" description="BAS confusing you? Enter your figures and get a plain-English explanation of what everything means before you lodge. Always confirm with your accountant.">
      <Row>
        <Field label="Business Name"><Input placeholder="e.g. Riverstone Landscaping" value={fields.businessName} onChange={e => set('businessName', e.target.value)} /></Field>
        <Field label="BAS Period"><Input placeholder="e.g. Q2 2025, Jan–Mar 2025" value={fields.period} onChange={e => set('period', e.target.value)} /></Field>
      </Row>
      <Row>
        <Field label="Total Sales / Income ($)"><Input type="number" placeholder="e.g. 85000" value={fields.totalSales} onChange={e => set('totalSales', e.target.value)} /></Field>
        <Field label="GST Collected ($)"><Input type="number" placeholder="e.g. 7727" value={fields.gstCollected} onChange={e => set('gstCollected', e.target.value)} /></Field>
      </Row>
      <Row>
        <Field label="GST Paid on Purchases ($)"><Input type="number" placeholder="e.g. 3200" value={fields.gstPaid} onChange={e => set('gstPaid', e.target.value)} /></Field>
        <Field label="Wages / PAYG ($)"><Input type="number" placeholder="e.g. 12000" value={fields.wages} onChange={e => set('wages', e.target.value)} /></Field>
      </Row>
      <Field label="Specific Questions">
        <Textarea placeholder="e.g. Why is my GST refund lower than expected? What does Label G1 mean?" value={fields.questions} onChange={e => set('questions', e.target.value)} />
      </Field>
      <GenerateButton loading={loading} disabled={false} label="Explain My BAS" loadingLabel="Analysing your BAS…" onClick={() => generate(fields)} />
      <OutputBox text={output} loading={loading} error={error} />
    </ToolCard>
  )
}
