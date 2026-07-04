import { useState } from 'react'
import { Image } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import { Field, Row, Input, Select, Textarea, GenerateButton } from '../components/FormField'
import { getCanvaUrl } from '../utils/canvaTemplates'
import styles from './SocialMediaGenerator.module.css'

const PLATFORMS = [
  { value: 'facebook_post', label: 'Facebook Post' },
  { value: 'instagram_post', label: 'Instagram Post' },
  { value: 'linkedin_post', label: 'LinkedIn Post' },
  { value: 'twitter_post', label: 'Twitter / X Post' },
]

const POST_TYPES = [
  'Announcement',
  'Promotion / Sale',
  'New Product or Service',
  'Opening Hours Update',
  'Testimonial / Review',
  'Tip or Advice',
  'Event',
  'General Update',
]

export default function SocialMediaGenerator({ setIsThinking }) {
  const [fields, setFields] = useState({
    businessName: '',
    platform: 'facebook_post',
    postType: 'Announcement',
    message: '',
    tone: 'professional',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const set = (k, v) => setFields(p => ({ ...p, [k]: v }))

  async function generate() {
    if (!fields.businessName || !fields.message) return
    setLoading(true)
    setIsThinking(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: 'You are a social media copywriter for Australian small businesses. Write engaging captions in Australian English. Return ONLY the caption and hashtags.',
          user: [
            'Write a ' + fields.platform.replace(/_/g, ' ') + ' caption for an Australian small business.',
            'Business: ' + fields.businessName,
            'Post Type: ' + fields.postType,
            'Message: ' + fields.message,
            'Tone: ' + fields.tone,
            'Add 3-5 hashtags. Keep it under 150 words.',
          ].join('\n'),
        }),
      })
      const data = await res.json()
      const canvaUrl = getCanvaUrl(fields.platform, fields.postType)
      const platformLabel = PLATFORMS.find(p => p.value === fields.platform)?.label || 'Post'
      setResult({ caption: data.result || '', canvaUrl, platformLabel })
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      setIsThinking(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result.caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolCard
      icon={Image}
      title="Social Media Generator"
      description="Generate a caption and open a matching Canva template to design your graphic."
    >
      <Row>
        <Field label="Business Name *">
          <Input
            placeholder="e.g. Blue Dog Cafe"
            value={fields.businessName}
            onChange={e => set('businessName', e.target.value)}
          />
        </Field>
        <Field label="Platform">
          <Select value={fields.platform} onChange={e => set('platform', e.target.value)}>
            {PLATFORMS.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </Select>
        </Field>
      </Row>

      <Row>
        <Field label="Post Type">
          <Select value={fields.postType} onChange={e => set('postType', e.target.value)}>
            {POST_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="Tone">
          <Select value={fields.tone} onChange={e => set('tone', e.target.value)}>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly and Warm</option>
            <option value="bold">Bold and Energetic</option>
            <option value="minimal">Clean and Minimal</option>
            <option value="funny">Light and Humorous</option>
          </Select>
        </Field>
      </Row>

      <Field label="Your Message *">
        <Textarea
          placeholder="e.g. Open this Sunday! 20% off all menu items."
          value={fields.message}
          onChange={e => set('message', e.target.value)}
        />
      </Field>

      <GenerateButton
        loading={loading}
        disabled={!fields.businessName || !fields.message}
        label="Generate Caption + Open Canva Template"
        loadingLabel="Writing your caption..."
        onClick={generate}
      />

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {result && (
        <div className={styles.resultBox}>
          <span className={styles.resultLabel}>
            Your {result.platformLabel} is Ready
          </span>

          <div className={styles.captionBox}>
            <div className={styles.captionHeader}>
              <span className={styles.captionLabel}>Generated Caption</span>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy Caption'}
              </button>
            </div>
            <div className={styles.captionText}>{result.caption}</div>
          </div>

          <div className={styles.canvaBox}>
            <div className={styles.canvaInfo}>
              <div className={styles.canvaTitle}>Design Your Graphic in Canva</div>
              <div className={styles.canvaDesc}>
                Open a matching template, paste your caption, customise colours, and download.
              </div>
            </div>
            <a href={result.canvaUrl} target="_blank" className={styles.canvaBtn}>
              Open Canva Template
            </a>
          </div>

          <div className={styles.tip}>
            Tip: Copy your caption first, then open Canva and paste it into the template.
          </div>
        </div>
      )}
    </ToolCard>
  )
}