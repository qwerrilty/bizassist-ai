import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import styles from './OutputBox.module.css'

export default function OutputBox({ text, loading, error }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className={styles.box}>
        <div className={styles.header}>
          <span className={styles.label}>AI is writing…</span>
        </div>
        <div className={styles.skeleton} style={{ width: '88%' }} />
        <div className={styles.skeleton} style={{ width: '72%' }} />
        <div className={styles.skeleton} style={{ width: '80%' }} />
        <div className={styles.skeleton} style={{ width: '60%' }} />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${styles.box} ${styles.errorBox}`}>
        <span className={styles.errorText}>{error}</span>
      </div>
    )
  }

  if (!text) return null

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <span className={styles.label}>Generated Output</span>
        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <pre className={styles.output}>{text}</pre>
    </div>
  )
}
