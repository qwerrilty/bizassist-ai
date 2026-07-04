import styles from './ToolCard.module.css'

export default function ToolCard({ icon: Icon, title, description, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrap}>
          <Icon size={20} />
        </div>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>{description}</div>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
