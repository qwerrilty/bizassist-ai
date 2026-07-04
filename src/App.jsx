import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import InvoiceChaser from './pages/InvoiceChaser'
import QuoteFollowUp from './pages/QuoteFollowUp'
import BASAssistant from './pages/BASAssistant'
import ReviewResponder from './pages/ReviewResponder'
import ComplaintResponder from './pages/ComplaintResponder'
import JobAdWriter from './pages/JobAdWriter'
import PolicyGenerator from './pages/PolicyGenerator'
import MeetingSummary from './pages/MeetingSummary'
import ProposalGenerator from './pages/ProposalGenerator'
import styles from './App.module.css'

const PAGE_META = {
  dashboard:  { title: 'Dashboard',           sub: 'Welcome — what do you need today?' },
  invoice:    { title: 'Invoice Chaser',       sub: 'Draft professional payment follow-up emails' },
  quote:      { title: 'Quote Follow-Up',      sub: 'Turn pending quotes into confirmed jobs' },
  bas:        { title: 'BAS Assistant',        sub: 'Understand your BAS before lodging' },
  review:     { title: 'Review Responder',     sub: 'Reply to Google reviews professionally' },
  complaint:  { title: 'Complaint Responder',  sub: 'Handle customer complaints with confidence' },
  jobad:      { title: 'Job Ad Writer',        sub: 'Write Seek-ready job ads in seconds' },
  policy:     { title: 'Policy Generator',     sub: 'Create clear staff policies instantly' },
  meeting:    { title: 'Meeting Summary',      sub: 'Turn rough notes into structured minutes' },
  proposal:   { title: 'Proposal Generator',   sub: 'Win more work with polished proposals' },
}

const PAGES = {
  dashboard:  Dashboard,
  invoice:    InvoiceChaser,
  quote:      QuoteFollowUp,
  bas:        BASAssistant,
  review:     ReviewResponder,
  complaint:  ComplaintResponder,
  jobad:      JobAdWriter,
  policy:     PolicyGenerator,
  meeting:    MeetingSummary,
  proposal:   ProposalGenerator,
}

export default function App() {
  const [page, setPage]           = useState('dashboard')
  const [isThinking, setIsThinking] = useState(false)

  const PageComponent = PAGES[page]
  const meta = PAGE_META[page]

  return (
    <div className={styles.layout}>
      <Sidebar activePage={page} onNavigate={setPage} />

      <div className={styles.main}>
        <Topbar title={meta.title} subtitle={meta.sub} isThinking={isThinking} />

        <div className={styles.content}>
          {page === 'dashboard'
            ? <PageComponent onNavigate={setPage} />
            : <PageComponent setIsThinking={setIsThinking} />
          }
        </div>
      </div>
    </div>
  )
}
