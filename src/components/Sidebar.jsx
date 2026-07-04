import { Clock, Zap } from 'lucide-react'
import { NAV_SECTIONS, TRIAL_DAYS } from '../utils/constants'
import styles from './Sidebar.module.css'

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Zap size={17} color="#0F172A" strokeWidth={2.5} />
          </div>
          <div>
            <div className={styles.logoName}>BizAssist AI</div>
            <div className={styles.logoTag}>For Australian Small Business</div>
          </div>
        </div>

        <div className={styles.trialBadge}>
          <Clock size={12} />
          <span>{TRIAL_DAYS} days left in free trial</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <div
          className={`${styles.navItem} ${activePage === 'dashboard' ? styles.active : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </div>

        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <div className={styles.sectionLabel}>{section.label}</div>
            {section.items.map(item => (
              <div
                key={item.id}
                className={`${styles.navItem} ${activePage === item.id ? styles.active : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.footerNote}>Free Trial — All 9 tools unlocked</div>
        <button className={styles.upgradeBtn}>Upgrade to Pro — $49/mo</button>
      </div>
    </aside>
  )
}
