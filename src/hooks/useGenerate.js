import { useState } from 'react'
import { buildPrompt } from '../utils/buildPrompt'

export function useGenerate(toolId) {
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function generate(fields) {
    setLoading(true)
    setError(null)
    setOutput('')

    try {
      const { system, user } = buildPrompt(toolId, fields)

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: system || '',
          messages: [{ role: 'user', content: user }],
        }),
      })

      if (!res.ok) throw new Error(`API error: ${res.status}`)

      const data = await res.json()
      setOutput(data.content?.[0]?.text || '')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { output, loading, error, generate }
}