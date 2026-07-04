import styles from './FormField.module.css'

export function Field({ label, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  )
}

export function Row({ children }) {
  return <div className={styles.row}>{children}</div>
}

export function Input({ ...props }) {
  return <input className={styles.input} {...props} />
}

export function Textarea({ ...props }) {
  return <textarea className={styles.textarea} {...props} />
}

export function Select({ children, ...props }) {
  return (
    <select className={styles.select} {...props}>
      {children}
    </select>
  )
}

export function GenerateButton({ loading, disabled, label, loadingLabel }) {
  return (
    <button className={styles.generateBtn} disabled={loading || disabled}>
      {loading ? loadingLabel : label}
    </button>
  )
}
