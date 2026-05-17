import { motion, AnimatePresence } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 }
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
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
        className="flex flex-col items-center justify-center min-h-screen w-full px-5 py-12 relative z-10"
      >
        {/* Step indicator */}
        <motion.div variants={itemVariants} className="mb-10 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className="transition-all duration-500"
                style={{
                  width: i === step ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === step
                    ? 'linear-gradient(90deg, #2563EB, #60A5FA)'
                    : i < step
                    ? '#2563EB'
                    : '#1E293B',
                  boxShadow: i === step ? '0 0 10px rgba(37, 99, 235, 0.6)' : 'none'
                }}
              />
            ))}
          </div>
          <span className="text-xs font-medium ml-2" style={{ color: '#CBD5E1' }}>
            {step + 1}/{totalSteps}
          </span>
        </motion.div>

        {/* Question content */}
        <div className="w-full max-w-lg mx-auto text-center">
          {/* Small tag */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#60A5FA', boxShadow: '0 0 8px rgba(96,165,250,0.8)' }} />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#60A5FA' }}>
              Pergunta {step + 1}
            </span>
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#60A5FA', boxShadow: '0 0 8px rgba(96,165,250,0.8)' }} />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
              color: '#F8FAFC',
              letterSpacing: '-0.02em',
              lineHeight: '1.25'
            }}
          >
            {question}
          </motion.h1>

          {/* Subtext */}
          {subtext && (
            <motion.p
              variants={itemVariants}
              className="mb-10 leading-relaxed"
              style={{
                color: '#CBD5E1',
                fontSize: 'clamp(0.95rem, 3vw, 1.05rem)',
                lineHeight: '1.7'
              }}
            >
              {subtext}
            </motion.p>
          )}

          {!subtext && <div className="mb-10" />}

          {/* Options */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full">
            {options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => onAnswer(option)}
                className="btn-option w-full text-left px-5 py-4 rounded-2xl cursor-pointer relative z-10"
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'rgba(37, 99, 235, 0.1)',
                      border: '1px solid rgba(37, 99, 235, 0.2)',
                      color: '#60A5FA'
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-sm font-medium leading-snug" style={{ color: '#F8FAFC' }}>
                    {option}
                  </span>
                  <div className="ml-auto flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3l5 5-5 5" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
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
