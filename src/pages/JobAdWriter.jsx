import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import { useGenerate } from '../hooks/useGenerate'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Textarea, Select, GenerateButton } from '../components/FormField'
import OutputBox from '../components/OutputBox'

export default function JobAdWriter() {
  const [fields, setFields] = useState({ businessName: '', role: '', location: '', type: 'full-time', salary: '', experience: '', duties: '', perks: '' })
  const { output, loading, error, generate } = useGenerate('jobad')
  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))

  return (
    <ToolCard icon={Briefcase} title="Job Ad Writer" description="Write professional, Seek-ready job advertisements that attract quality candidates — without spending an hour staring at a blank page.">
      <Row>
        <Field label="Your Business Name"><Input placeholder="e.g. Sunshine Bakery" value={fields.businessName} onChange={e => set('businessName', e.target.value)} /></Field>
        <Field label="Role / Job Title *"><Input placeholder="e.g. Experienced Barista" value={fields.role} onChange={e => set('role', e.target.value)} /></Field>
      </Row>
      <Row>
        <Field label="Location *"><Input placeholder="e.g. Brisbane CBD, QLD" value={fields.location} onChange={e => set('location', e.target.value)} /></Field>
        <Field label="Employment Type">
          <Select value={fields.type} onChange={e => set('type', e.target.value)}>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="casual">Casual</option>
            <option value="contract">Contract</option>
          </Select>
        </Field>
      </Row>
      <Row>
        <Field label="Salary / Hourly Rate"><Input placeholder="e.g. $60,000–$65,000 or $28/hr" value={fields.salary} onChange={e => set('salary', e.target.value)} /></Field>
        <Field label="Experience Required"><Input placeholder="e.g. 2+ years in hospitality" value={fields.experience} onChange={e => set('experience', e.target.value)} /></Field>
      </Row>
      <Field label="Key Duties / Responsibilities">
        <Textarea placeholder="e.g. Prepare coffee, train new staff, maintain equipment…" value={fields.duties} onChange={e => set('duties', e.target.value)} />
      </Field>
      <Field label="Perks & Benefits">
        <Textarea placeholder="e.g. Staff meals, flexible hours, supportive team…" style={{ minHeight: 70 }} value={fields.perks} onChange={e => set('perks', e.target.value)} />
      </Field>
      <GenerateButton loading={loading} disabled={!fields.role || !fields.location} label="Generate Job Ad" loadingLabel="Writing your job ad…" onClick={() => generate(fields)} />
      <OutputBox text={output} loading={loading} error={error} />
    </ToolCard>
  )
}
