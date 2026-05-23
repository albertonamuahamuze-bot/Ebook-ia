import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FunnelQuestion from './components/FunnelQuestion'
import TransitionScreen from './components/TransitionScreen'
import OfferScreen from './components/OfferScreen'
import AdminPanel from './components/AdminPanel'
import { saveAnswer, markCompleted } from './lib/supabase'

const CHECKOUT_URL = 'https://checkout.escalepay.com/6050251'

const FUNNEL_STEPS = [
  {
    question: 'O teu telemóvel está a trabalhar para ti ou contra ti?',
    subtext: 'Como usas o teu tempo online hoje?',
    options: [
      'Apenas entretenimento',
      'Redes sociais e vídeos',
      'Aprendo algo novo às vezes',
      'Quero usar melhor o meu tempo online',
    ],
    field: 'question_1',
  },
]

// ─── Persistence helpers ──────────────────────────────────────────────────────

const STORAGE_KEY = 'funnel-session'

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36)
}

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function writeStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

function captureUTM() {
  try {
    const p = new URLSearchParams(window.location.search)
    const s = p.get('utm_source'), c = p.get('utm_campaign'), m = p.get('utm_medium')
    if (s || c || m) return { utm_source: s, utm_campaign: c, utm_medium: m }
  } catch {}
  return null
}

function initFunnelSession() {
  const stored = readStorage()
  const utmData = captureUTM()

  if (stored) {
    if (utmData && !stored.trafficSource) {
      const updated = { ...stored, trafficSource: utmData }
      writeStorage(updated)
      return updated
    }
    return stored
  }

  const fresh = {
    sessionId: generateSessionId(),
    currentStep: 0,
    answers: [],
    startedAt: Date.now(),
    lastUpdated: Date.now(),
    completed: false,
    trafficSource: utmData,
  }
  writeStorage(fresh)
  return fresh
}

// ─── Static UI components ─────────────────────────────────────────────────────

function Background() {
  return (
    <>
      <div className="noise-overlay" />
      <div className="orb-1" />
      <div className="orb-2" />
      <div
        className="fixed inset-0 grid-pattern pointer-events-none"
        style={{ opacity: 0.4, zIndex: 0 }}
      />
    </>
  )
}

function Header({ onAdminClick, showBuyButton }) {
  const tapCount = useRef(0)
  const tapTimer = useRef(null)

  function handleLogoTap() {
    tapCount.current += 1
    clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => { tapCount.current = 0 }, 800)
    if (tapCount.current >= 5) {
      tapCount.current = 0
      onAdminClick()
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
      style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, transparent 100%)' }}
    >
      <button onClick={handleLogoTap} className="flex items-center gap-2.5 select-none">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
            boxShadow: '0 0 12px rgba(37,99,235,0.4)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 1.5Z" fill="white"/>
          </svg>
        </div>
        <span className="text-sm font-semibold" style={{ color: '#F8FAFC', fontFamily: "'Space Grotesk', sans-serif" }}>
          Telemóvel com IA
        </span>
      </button>

      {showBuyButton && (
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary rounded-xl font-semibold"
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '-0.01em'
          }}
          onClick={() => {
            if (typeof fbq === 'function') fbq('track', 'InitiateCheckout')
          }}
        >
          Comprar
        </a>
      )}
    </header>
  )
}

// ─── Phase constants ──────────────────────────────────────────────────────────

const PHASE = {
  FUNNEL: 'funnel',
  TRANSITION: 'transition',
  OFFER: 'offer',
  ADMIN: 'admin',
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [session, setSession] = useState(initFunnelSession)
  const [phase, setPhase] = useState(() =>
    readStorage()?.completed ? PHASE.OFFER : PHASE.FUNNEL
  )

  useEffect(() => {
    document.body.style.background = '#03081A'
  }, [])

  const persistSession = useCallback((updates) => {
    setSession(prev => {
      const next = { ...prev, ...updates, lastUpdated: Date.now() }
      writeStorage(next)
      return next
    })
  }, [])

  const handleAnswer = useCallback(async (answer) => {
    const currentStepData = FUNNEL_STEPS[session.currentStep]
    const newAnswer = {
      questionId: session.currentStep + 1,
      answer,
      answeredAt: Date.now(),
    }
    const isLast = session.currentStep >= FUNNEL_STEPS.length - 1

    persistSession({
      currentStep: isLast ? session.currentStep : session.currentStep + 1,
      answers: [...session.answers, newAnswer],
    })

    await saveAnswer(session.sessionId, currentStepData.field, answer)

    if (isLast) {
      setPhase(PHASE.TRANSITION)
    }
  }, [session, persistSession])

  const handleTransitionDone = useCallback(async () => {
    persistSession({ completed: true })
    await markCompleted(session.sessionId)
    setPhase(PHASE.OFFER)
  }, [session.sessionId, persistSession])

  const handleAdminToggle = useCallback(() => {
    setPhase(p =>
      p === PHASE.ADMIN
        ? (session.completed ? PHASE.OFFER : PHASE.FUNNEL)
        : PHASE.ADMIN
    )
  }, [session.completed])

  const resetFunnel = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    const fresh = initFunnelSession()
    setSession(fresh)
    setPhase(PHASE.FUNNEL)
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: '#03081A' }}>
      <Background />

      {phase !== PHASE.ADMIN && (
        <Header
          onAdminClick={handleAdminToggle}
          showBuyButton={phase === PHASE.OFFER}
        />
      )}

      <AnimatePresence mode="wait">
        {phase === PHASE.FUNNEL && (
          <motion.div key="funnel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FunnelQuestion
              key={session.currentStep}
              step={session.currentStep}
              question={FUNNEL_STEPS[session.currentStep].question}
              subtext={FUNNEL_STEPS[session.currentStep].subtext}
              options={FUNNEL_STEPS[session.currentStep].options}
              onAnswer={handleAnswer}
              totalSteps={FUNNEL_STEPS.length}
            />
          </motion.div>
        )}

        {phase === PHASE.TRANSITION && (
          <motion.div key="transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TransitionScreen onDone={handleTransitionDone} />
          </motion.div>
        )}

        {phase === PHASE.OFFER && (
          <motion.div key="offer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OfferScreen />
          </motion.div>
        )}

        {phase === PHASE.ADMIN && (
          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminPanel onExit={handleAdminToggle} onReset={resetFunnel} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
