import styles from './Topbar.module.css'

export default function Topbar({ title, subtitle, isThinking }) {
  return (
    <div className={styles.topbar}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      <div className={styles.status}>
        <span className={`${styles.dot} ${isThinking ? styles.thinking : ''}`} />
        <span>{isThinking ? 'AI is writing…' : 'AI ready'}</span>
      </div>
    </div>
  )
}
