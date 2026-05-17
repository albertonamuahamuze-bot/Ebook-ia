import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FunnelQuestion from './components/FunnelQuestion'
import TransitionScreen from './components/TransitionScreen'
import OfferScreen from './components/OfferScreen'
import AdminPanel from './components/AdminPanel'
import { saveAnswer, markCompleted } from './lib/supabase'

const FUNNEL_STEPS = [
  {
    question: 'E se o teu telemóvel pudesse abrir novas oportunidades para tua vida?',
    subtext: null,
    options: [
      'Nunca pensei nisso',
      'Já pensei, mas não sei como começar',
      'Estou procurando uma oportunidade',
    ],
    field: 'question_1',
  },
  {
    question: 'Qual destas situações mais se parece contigo hoje?',
    subtext: null,
    options: [
      'Quero começar algo, mas sinto-me perdido',
      'Tenho vontade de crescer online',
      'Vejo pessoas evoluindo e quero aprender também',
      'Quero criar uma nova fonte de renda',
    ],
    field: 'question_2',
  },
  {
    question: 'Hoje, milhares de pessoas estão usando IA para criar oportunidades usando apenas o telemóvel.',
    subtext: 'E se tu também pudesses aprender isso de forma simples?',
    options: [
      'Quero descobrir como',
      'Isso chamou minha atenção',
      'Quero aprender do zero',
    ],
    field: 'question_3',
  },
  {
    question: 'O que mais te atrai na ideia de crescer no mercado digital?',
    subtext: null,
    options: [
      'Liberdade',
      'Aprender algo moderno',
      'Criar uma renda extra',
      'Evoluir pessoalmente',
    ],
    field: 'question_4',
  },
]

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36)
}

// Background decorative elements
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

// Header logo
function Header({ onAdminClick }) {
  const [showAdmin, setShowAdmin] = useState(false)
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-5 py-4"
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
    </header>
  )
}

// 'PHASE' enum
const PHASE = {
  FUNNEL: 'funnel',
  TRANSITION: 'transition',
  OFFER: 'offer',
  ADMIN: 'admin',
}

export default function App() {
  const [phase, setPhase] = useState(PHASE.FUNNEL)
  const [step, setStep] = useState(0)
  const [sessionId] = useState(generateSessionId)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.background = '#020617'
    }
  }, [])

  const handleAnswer = useCallback(async (answer) => {
    const currentStep = FUNNEL_STEPS[step]
    await saveAnswer(sessionId, currentStep.field, answer)

    if (step < FUNNEL_STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      setPhase(PHASE.TRANSITION)
    }
  }, [step, sessionId])

  const handleTransitionDone = useCallback(async () => {
    await markCompleted(sessionId)
    setPhase(PHASE.OFFER)
  }, [sessionId])

  const handleAdminToggle = useCallback(() => {
    setPhase(p => p === PHASE.ADMIN ? PHASE.FUNNEL : PHASE.ADMIN)
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: '#020617' }}>
      <Background />

      {phase !== PHASE.ADMIN && (
        <Header onAdminClick={handleAdminToggle} />
      )}

      <AnimatePresence mode="wait">
        {phase === PHASE.FUNNEL && (
          <motion.div key="funnel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FunnelQuestion
              key={step}
              step={step}
              question={FUNNEL_STEPS[step].question}
              subtext={FUNNEL_STEPS[step].subtext}
              options={FUNNEL_STEPS[step].options}
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
            <AdminPanel onExit={handleAdminToggle} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
