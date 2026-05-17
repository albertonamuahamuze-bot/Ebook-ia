import { motion, AnimatePresence } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.07 }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.32, ease: [0.55, 0, 1, 0.45] }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }
}

export default function FunnelQuestion({ step, question, subtext, options, onAnswer, totalSteps }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center w-full relative z-10"
        style={{
          minHeight: '100svh',
          paddingTop: '96px',
          paddingBottom: '28px',
          paddingLeft: '22px',
          paddingRight: '22px',
          justifyContent: 'flex-start',
        }}
      >
        {/* Step indicator */}
        <motion.div variants={itemVariants} className="mb-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className="transition-all duration-500"
                style={{
                  width: i === step ? '18px' : '5px',
                  height: '5px',
                  borderRadius: '3px',
                  background: i === step
                    ? 'linear-gradient(90deg, #2563EB, #60A5FA)'
                    : i < step
                    ? '#2563EB'
                    : '#1E293B',
                  boxShadow: i === step ? '0 0 7px rgba(37, 99, 235, 0.45)' : 'none'
                }}
              />
            ))}
          </div>
          <span className="text-xs font-semibold ml-1.5" style={{ color: '#64748B' }}>
            {step + 1}/{totalSteps}
          </span>
        </motion.div>

        {/* Question content */}
        <div className="w-full max-w-md mx-auto text-center">
          {/* Tag */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-3">
            <div
              className="w-1.5 h-1.5 rounded-full pulse-dot"
              style={{ background: '#60A5FA', boxShadow: '0 0 6px rgba(96,165,250,0.7)' }}
            />
            <span
              className="uppercase tracking-widest font-semibold"
              style={{ color: '#60A5FA', fontSize: '10px', letterSpacing: '2px' }}
            >
              Pergunta {step + 1}
            </span>
            <div
              className="w-1.5 h-1.5 rounded-full pulse-dot"
              style={{ background: '#60A5FA', boxShadow: '0 0 6px rgba(96,165,250,0.7)' }}
            />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-4"
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: 'clamp(1.375rem, 5vw, 2rem)',
              fontWeight: 800,
              color: '#F8FAFC',
              letterSpacing: '-0.022em',
              lineHeight: '1.2'
            }}
          >
            {question}
          </motion.h1>

          {/* Subtext */}
          {subtext && (
            <motion.p
              variants={itemVariants}
              style={{
                color: '#93C5FD',
                fontSize: 'clamp(0.9rem, 2.8vw, 1rem)',
                lineHeight: '1.6',
                fontWeight: 500,
                marginBottom: '20px'
              }}
            >
              {subtext}
            </motion.p>
          )}

          {!subtext && <div style={{ height: '20px' }} />}

          {/* Options */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col w-full"
            style={{ gap: '12px' }}
          >
            {options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => onAnswer(option)}
                className="btn-option w-full text-left rounded-xl cursor-pointer relative z-10"
                whileTap={{ scale: 0.985 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  minHeight: '54px',
                  padding: '13px 16px',
                }}
              >
                <div className="flex items-center" style={{ gap: '14px' }}>
                  <div
                    className="flex-shrink-0 rounded-lg flex items-center justify-center font-bold"
                    style={{
                      background: 'rgba(37, 99, 235, 0.1)',
                      border: '1px solid rgba(37, 99, 235, 0.22)',
                      color: '#60A5FA',
                      width: '30px',
                      height: '30px',
                      fontSize: '12px',
                      minWidth: '30px'
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span
                    className="leading-snug flex-1"
                    style={{
                      color: '#F1F5F9',
                      fontSize: 'clamp(0.875rem, 3vw, 0.95rem)',
                      fontWeight: 500
                    }}
                  >
                    {option}
                  </span>
                  <div className="flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3l5 5-5 5" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
