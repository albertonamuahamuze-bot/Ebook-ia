import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function TransitionScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen w-full px-6 relative z-10"
    >
      {/* Animated rings */}
      <div className="relative flex items-center justify-center mb-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 60 + i * 50,
              height: 60 + i * 50,
              border: '1px solid rgba(37, 99, 235, 0.25)',
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Center icon */}
        <motion.div
          className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
            boxShadow: '0 0 30px rgba(37, 99, 235, 0.5), 0 0 60px rgba(37, 99, 235, 0.2)'
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z"
              fill="white" opacity="0.9"/>
          </svg>
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p
          className="font-semibold mb-2"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.1rem, 4vw, 1.35rem)',
            color: '#F8FAFC',
            letterSpacing: '-0.01em'
          }}
        >
          Estamos preparando a tua experiência…
        </p>
        <p className="text-sm" style={{ color: '#CBD5E1' }}>
          Personalizado para ti
        </p>
      </motion.div>

      {/* Animated dots */}
      <motion.div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#2563EB' }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
