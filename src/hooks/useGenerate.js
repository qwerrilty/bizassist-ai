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

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system, user }),
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const data = await res.json()
      setOutput(data.result || '')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { output, loading, error, generate }
}
