import { useState } from 'react'
import { Mic } from 'lucide-react'
import { useGenerate } from '../hooks/useGenerate'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Textarea, GenerateButton } from '../components/FormField'
import OutputBox from '../components/OutputBox'

export default function MeetingSummary() {
  const [fields, setFields] = useState({ businessName: '', attendees: '', date: '', notes: '' })
  const { output, loading, error, generate } = useGenerate('meeting')
  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))

  return (
    <ToolCard icon={Mic} title="Meeting Summary" description="Paste your rough notes and get structured minutes with action items, decisions, and next steps — ready to share with your team.">
      <Row>
        <Field label="Business / Team Name"><Input placeholder="e.g. Management Team" value={fields.businessName} onChange={e => set('businessName', e.target.value)} /></Field>
        <Field label="Meeting Date"><Input type="date" value={fields.date} onChange={e => set('date', e.target.value)} /></Field>
      </Row>
      <Field label="Attendees"><Input placeholder="e.g. Sarah, Dave, Kim, Tom" value={fields.attendees} onChange={e => set('attendees', e.target.value)} /></Field>
      <Field label="Paste Your Notes Here *">
        <Textarea placeholder="Just dump everything here — bullet points, half sentences, shorthand — all fine…" style={{ minHeight: 160 }} value={fields.notes} onChange={e => set('notes', e.target.value)} />
      </Field>
      <GenerateButton loading={loading} disabled={!fields.notes} label="Generate Meeting Minutes" loadingLabel="Organising your notes…" onClick={() => generate(fields)} />
      <OutputBox text={output} loading={loading} error={error} />
    </ToolCard>
  )
}
