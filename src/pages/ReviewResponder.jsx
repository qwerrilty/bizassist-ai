import { useState } from 'react'
import { Star } from 'lucide-react'
import { useGenerate } from '../hooks/useGenerate'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Textarea, Select, GenerateButton } from '../components/FormField'
import OutputBox from '../components/OutputBox'

export default function ReviewResponder() {
  const [fields, setFields] = useState({ businessName: '', businessType: '', reviewerName: '', rating: '5', reviewText: '' })
  const { output, loading, error, generate } = useGenerate('review')
  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))

  return (
    <ToolCard icon={Star} title="Review Responder" description="Responding to Google reviews builds trust and improves your ranking. Paste any review and get a professional response instantly.">
      <Row>
        <Field label="Your Business Name"><Input placeholder="e.g. Blue Dog Cafe" value={fields.businessName} onChange={e => set('businessName', e.target.value)} /></Field>
        <Field label="Business Type"><Input placeholder="e.g. cafe, plumber, retailer" value={fields.businessType} onChange={e => set('businessType', e.target.value)} /></Field>
      </Row>
      <Row>
        <Field label="Reviewer Name"><Input placeholder="e.g. John M." value={fields.reviewerName} onChange={e => set('reviewerName', e.target.value)} /></Field>
        <Field label="Star Rating">
          <Select value={fields.rating} onChange={e => set('rating', e.target.value)}>
            <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
            <option value="4">⭐⭐⭐⭐ 4 Stars</option>
            <option value="3">⭐⭐⭐ 3 Stars</option>
            <option value="2">⭐⭐ 2 Stars</option>
            <option value="1">⭐ 1 Star</option>
          </Select>
        </Field>
      </Row>
      <Field label="Review Text *">
        <Textarea placeholder="Paste the review here…" style={{ minHeight: 110 }} value={fields.reviewText} onChange={e => set('reviewText', e.target.value)} />
      </Field>
      <GenerateButton loading={loading} disabled={!fields.reviewText} label="Generate Review Response" loadingLabel="Writing your response…" onClick={() => generate(fields)} />
      <OutputBox text={output} loading={loading} error={error} />
    </ToolCard>
  )
}
