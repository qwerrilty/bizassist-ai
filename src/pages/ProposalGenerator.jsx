import { useState } from 'react'
import { Zap } from 'lucide-react'
import { useGenerate } from '../hooks/useGenerate'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Textarea, GenerateButton } from '../components/FormField'
import OutputBox from '../components/OutputBox'

export default function ProposalGenerator() {
  const [fields, setFields] = useState({ businessName: '', clientName: '', service: '', scope: '', price: '', timeline: '', whyUs: '' })
  const { output, loading, error, generate } = useGenerate('proposal')
  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))

  return (
    <ToolCard icon={Zap} title="Proposal Generator" description="Write professional proposals that win work. Fill in the basics and get a complete, polished proposal ready to send.">
      <Row>
        <Field label="Your Business Name"><Input placeholder="e.g. Peak Constructions" value={fields.businessName} onChange={e => set('businessName', e.target.value)} /></Field>
        <Field label="Client / Prospect Name *"><Input placeholder="e.g. Greenfield Properties" value={fields.clientName} onChange={e => set('clientName', e.target.value)} /></Field>
      </Row>
      <Field label="Service / Project *"><Input placeholder="e.g. Commercial office fitout — Level 3, 22 King St" value={fields.service} onChange={e => set('service', e.target.value)} /></Field>
      <Field label="Scope of Work">
        <Textarea placeholder="e.g. Supply and install partitioning, flooring, lighting, paint across 450sqm…" value={fields.scope} onChange={e => set('scope', e.target.value)} />
      </Field>
      <Row>
        <Field label="Price / Investment ($AUD)"><Input type="number" placeholder="e.g. 85000" value={fields.price} onChange={e => set('price', e.target.value)} /></Field>
        <Field label="Timeline"><Input placeholder="e.g. 6 weeks from approval" value={fields.timeline} onChange={e => set('timeline', e.target.value)} /></Field>
      </Row>
      <Field label="Why Should They Choose You?">
        <Textarea placeholder="e.g. 12 years experience, licensed, local, 50+ commercial fitouts completed…" style={{ minHeight: 70 }} value={fields.whyUs} onChange={e => set('whyUs', e.target.value)} />
      </Field>
      <GenerateButton loading={loading} disabled={!fields.clientName || !fields.service} label="Generate Proposal" loadingLabel="Writing your proposal…" onClick={() => generate(fields)} />
      <OutputBox text={output} loading={loading} error={error} />
    </ToolCard>
  )
}
