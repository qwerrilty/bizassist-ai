import { NAV_SECTIONS } from '../utils/constants'
import styles from './Dashboard.module.css'

const STATS = [
  { label: 'Free Trial',        value: '14',  unit: 'days remaining' },
  { label: 'Tools Available',   value: '9',   unit: 'all unlocked' },
  { label: 'Docs Generated',    value: '0',   unit: 'get started below' },
  { label: 'Est. Time Saved',   value: '0h',  unit: '~15 min per doc' },
]

export default function Dashboard({ onNavigate }) {
  const allTools = NAV_SECTIONS.flatMap(s => s.items)

  return (
    <div className={styles.page}>
      <div className={styles.statsGrid}>
        {STATS.map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statUnit}>{s.unit}</div>
          </div>
        ))}
      </div>

      <div className={styles.sectionTitle}>All Tools</div>
      <div className={styles.toolsGrid}>
        {allTools.map(tool => (
          <div
            key={tool.id}
            className={styles.toolTile}
            onClick={() => onNavigate(tool.id)}
          >
            <div className={styles.tileName}>{tool.label}</div>
            <div className={styles.tileArrow}>→</div>
          </div>
        ))}
      </div>

      <div className={styles.tip}>
        <strong>Getting started:</strong> Pick any tool from the sidebar or the tiles above.
        Fill in your details, hit Generate, and copy the result straight into your email or document.
      </div>
    </div>
  )
}
