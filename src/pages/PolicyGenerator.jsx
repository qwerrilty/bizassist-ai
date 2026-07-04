import { useState } from 'react'
import { ScrollText } from 'lucide-react'
import { useGenerate } from '../hooks/useGenerate'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Textarea, Select, GenerateButton } from '../components/FormField'
import OutputBox from '../components/OutputBox'

export default function PolicyGenerator() {
  const [fields, setFields] = useState({ businessName: '', industry: '', policyType: 'leave', customDetails: '' })
  const { output, loading, error, generate } = useGenerate('policy')
  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))

  return (
    <ToolCard icon={ScrollText} title="Policy Generator" description="Create clear, professional workplace policies without paying a lawyer. Built for Australian small businesses under Fair Work.">
      <Row>
        <Field label="Business Name"><Input placeholder="e.g. Coastal Cleaning Co." value={fields.businessName} onChange={e => set('businessName', e.target.value)} /></Field>
        <Field label="Industry"><Input placeholder="e.g. hospitality, construction, retail" value={fields.industry} onChange={e => set('industry', e.target.value)} /></Field>
      </Row>
      <Field label="Policy Type">
        <Select value={fields.policyType} onChange={e => set('policyType', e.target.value)}>
          <option value="leave">Leave Policy (annual, sick, personal)</option>
          <option value="whs">Work Health & Safety (WHS)</option>
          <option value="social-media">Social Media & Online Conduct</option>
          <option value="mobile-phone">Mobile Phone Use</option>
          <option value="uniform-dress">Uniform & Dress Code</option>
          <option value="grievance">Grievance & Complaints</option>
          <option value="discrimination">Anti-Discrimination & Harassment</option>
          <option value="performance">Performance Management</option>
          <option value="confidentiality">Confidentiality & Privacy</option>
          <option value="remote-work">Remote Work</option>
        </Select>
      </Field>
      <Field label="Specific Details or Requirements">
        <Textarea placeholder="e.g. We have 8 staff, operate 7 days a week, staff use personal phones for customer comms…" value={fields.customDetails} onChange={e => set('customDetails', e.target.value)} />
      </Field>
      <GenerateButton loading={loading} disabled={false} label="Generate Policy Document" loadingLabel="Writing your policy…" onClick={() => generate(fields)} />
      <OutputBox text={output} loading={loading} error={error} />
    </ToolCard>
  )
}
