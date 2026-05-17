import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHECKOUT_URL = 'https://checkout.escalepay.com/6050251'

const benefits = [
  { icon: '📘', title: 'Ebook Premium', desc: 'Guia completo passo a passo' },
  { icon: '🔐', title: 'Área Exclusiva', desc: 'Acesso vitalício ao conteúdo' },
  { icon: '🤖', title: 'Prompts Estratégicos', desc: 'Prontos para usar imediatamente' },
  { icon: '👥', title: 'Comunidade Exclusiva', desc: 'Rede de apoio e crescimento' },
  { icon: '🎬', title: 'Ferramentas e Vídeos', desc: 'Recursos práticos e atualizados' },
  { icon: '🚀', title: 'Estratégias Reais', desc: 'Aplicáveis desde o primeiro dia' },
]

const testimonials = [
  {
    quote: 'Nunca pensei que conseguiria entender IA usando apenas o telemóvel.',
    name: 'Carlos',
    initial: 'C',
    gradient: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
    avatar: '/avatars/carlos.png'
  },
  {
    quote: 'O conteúdo é simples, moderno e direto ao ponto.',
    name: 'Vanessa',
    initial: 'V',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
    avatar: '/avatars/vanessa.png'
  },
  {
    quote: 'Finalmente encontrei algo adaptado à minha realidade.',
    name: 'Jeremias',
    initial: 'J',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #60A5FA 100%)',
    avatar: '/avatars/jeremias.png'
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.065, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 56 : -56, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: (dir) => ({
    x: dir > 0 ? -56 : 56,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 0.6, 1] }
  })
}

function EbookCover() {
  const [imgError, setImgError] = useState(false)

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute',
        inset: '-24px',
        background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 68%)',
        filter: 'blur(16px)',
        zIndex: 0,
        borderRadius: '50%'
      }} />
      <div
        className="float-anim"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '148px',
          aspectRatio: '2/3',
          borderRadius: '4px 12px 12px 4px',
          overflow: 'hidden',
          transform: 'perspective(700px) rotateY(-10deg) rotateX(1deg)',
          boxShadow: '8px 16px 40px rgba(0,0,0,0.65), -2px 0 8px rgba(0,0,0,0.3), 0 0 18px rgba(37,99,235,0.12)',
          border: '1px solid rgba(37,99,235,0.22)',
        }}
      >
        {!imgError ? (
          <img
            src="/ebook-cover.png"
            alt="Capa do Ebook"
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(155deg, #0A1628 0%, #1A3A6B 45%, #0A1628 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '20px 14px', textAlign: 'center'
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '14px',
              boxShadow: '0 0 14px rgba(37,99,235,0.45)'
            }}>
              <span style={{ fontSize: '20px' }}>📱</span>
            </div>
            <p style={{
              fontSize: '7.5px', fontWeight: 700, letterSpacing: '2.5px',
              color: '#60A5FA', textTransform: 'uppercase', marginBottom: '8px'
            }}>
              Ebook Premium
            </p>
            <p style={{
              fontSize: '10px', fontWeight: 700, color: '#F8FAFC',
              lineHeight: 1.45, fontFamily: "'Space Grotesk', sans-serif"
            }}>
              Transforma o Teu Telemóvel em Fonte de Renda com IA
            </p>
            <div style={{
              width: '28px', height: '2px', borderRadius: '1px', marginTop: '12px',
              background: 'linear-gradient(90deg, #2563EB, #60A5FA)'
            }} />
          </div>
        )}
        <div style={{
          position: 'absolute', left: 0, top: 0, width: '10px', height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.08) 100%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '35%', height: '100%',
          background: 'linear-gradient(135deg, transparent 55%, rgba(255,255,255,0.035) 100%)',
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  )
}

function Avatar({ src, initial, gradient }) {
  const [imgError, setImgError] = useState(false)

  const baseStyle = {
    width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
    border: '1.5px solid rgba(37, 99, 235, 0.28)',
    boxShadow: '0 0 12px rgba(37,99,235,0.15)',
    overflow: 'hidden',
  }

  if (src && !imgError) {
    return (
      <div style={baseStyle}>
        <img
          src={src}
          alt={initial}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    )
  }

  return (
    <div style={{ ...baseStyle, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
        {initial}
      </span>
    </div>
  )
}

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(id)
  }, [isPaused])

  const goTo = (idx) => {
    if (idx === current) return
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const t = testimonials[current]

  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          color: '#F1F5F9',
          fontSize: '15px',
          marginBottom: '4px'
        }}>
          Experiências Reais
        </p>
        <p style={{ color: '#64748B', fontSize: '12px', lineHeight: '1.5' }}>
          Pessoas que começaram a ver a IA com outros olhos.
        </p>
      </div>

      {/* Card carousel */}
      <div
        style={{ overflow: 'hidden' }}
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
        onPointerLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              background: 'rgba(15, 23, 42, 0.72)',
              border: '1px solid rgba(37, 99, 235, 0.18)',
              borderRadius: '16px',
              padding: '18px 20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.22), 0 0 0 1px rgba(37,99,235,0.06)',
            }}
          >
            {/* Avatar + name + stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <Avatar src={t.avatar} initial={t.initial} gradient={t.gradient} />

              <div>
                <p style={{
                  color: '#E2E8F0',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '4px',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  {t.name}
                </p>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="10" height="10" viewBox="0 0 24 24" fill="#D97706">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote */}
            <p style={{
              color: '#CBD5E1',
              fontSize: '13.5px',
              lineHeight: '1.65',
              fontStyle: 'italic',
              fontFamily: "'Inter', sans-serif"
            }}>
              "{t.quote}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? '18px' : '5px',
              height: '5px',
              borderRadius: '3px',
              background: i === current
                ? 'linear-gradient(90deg, #2563EB, #60A5FA)'
                : '#1E293B',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s ease',
              boxShadow: i === current ? '0 0 6px rgba(37,99,235,0.4)' : 'none'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function OfferScreen() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col items-center relative z-10"
      style={{
        minHeight: '100svh',
        paddingTop: '72px',
        paddingBottom: '60px',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}
    >
      <div className="w-full" style={{ maxWidth: '440px', margin: '0 auto' }}>

        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-7">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(37, 99, 235, 0.1)',
              border: '1px solid rgba(37, 99, 235, 0.28)',
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full pulse-dot"
              style={{ background: '#60A5FA', boxShadow: '0 0 5px rgba(96,165,250,0.7)' }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#60A5FA' }}
            >
              Oportunidade Exclusiva
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="text-center font-bold leading-tight mb-4"
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: 'clamp(1.5rem, 5.5vw, 2.2rem)',
            letterSpacing: '-0.025em',
            lineHeight: '1.22',
            color: '#F8FAFC'
          }}
        >
          <span className="gradient-text">O teu telemóvel</span>
          {' '}pode ser o início da tua próxima fonte de renda.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-center leading-relaxed mb-9"
          style={{
            color: '#94A3B8',
            fontSize: 'clamp(0.85rem, 2.8vw, 0.95rem)',
            lineHeight: '1.7'
          }}
        >
          Aprende como usar Inteligência Artificial para criar oportunidades reais
          usando apenas o telemóvel — mesmo começando do zero.
        </motion.p>

        {/* Ebook cover */}
        <motion.div variants={itemVariants} className="flex justify-center mb-9">
          <EbookCover />
        </motion.div>

        {/* What you get */}
        <motion.div variants={itemVariants} className="mb-8">
          <p
            className="text-center font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#60A5FA', fontSize: '10px', letterSpacing: '2px' }}
          >
            O que vais receber
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl flex flex-col gap-1.5"
                style={{ padding: '14px 12px' }}
              >
                <span style={{ fontSize: '18px', lineHeight: 1 }}>{b.icon}</span>
                <p className="font-semibold leading-tight" style={{ color: '#F1F5F9', fontSize: '11.5px' }}>
                  {b.title}
                </p>
                <p style={{ color: '#64748B', fontSize: '10.5px', lineHeight: '1.4' }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(30,41,59,0.8))' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: '#1E3A5F' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(30,41,59,0.8), transparent)' }} />
        </motion.div>

        {/* Aggregate rating */}
        <motion.div variants={itemVariants} className="text-center mb-7">
          <div className="flex items-center justify-center gap-0.5 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <p style={{ color: '#64748B', fontSize: '11.5px' }}>
            Milhares já estão a transformar o telemóvel em oportunidade
          </p>
        </motion.div>

        {/* Price + CTA card */}
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-3xl mb-6"
          style={{ padding: '24px 20px', border: '1px solid rgba(37,99,235,0.18)' }}
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-1 h-1 rounded-full" style={{ background: '#F59E0B' }} />
            <span
              className="uppercase font-semibold tracking-widest"
              style={{ color: '#F59E0B', fontSize: '9.5px', letterSpacing: '2px' }}
            >
              Oferta de lançamento
            </span>
            <div className="w-1 h-1 rounded-full" style={{ background: '#F59E0B' }} />
          </div>

          <div className="text-center mb-6">
            <p className="line-through mb-1" style={{ color: '#475569', fontSize: '13px' }}>
              1.500 MT
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span style={{ color: '#64748B', fontSize: '12px', fontWeight: 500 }}>Por apenas</span>
              <span
                className="font-bold"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 2.75rem)',
                  color: '#F8FAFC',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '-0.04em',
                  lineHeight: 1
                }}
              >
                697 MT
              </span>
            </div>
          </div>

          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block w-full text-center rounded-2xl font-bold glow-blue"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(0.9rem, 3vw, 1.05rem)',
              letterSpacing: '-0.01em',
              padding: '15px 20px',
              display: 'block'
            }}
          >
            🚀 Quero Começar Agora
          </a>

          <p className="text-center mt-3" style={{ color: '#475569', fontSize: '11px' }}>
            Acesso imediato após a confirmação
          </p>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center"
          style={{ gap: '20px', marginBottom: '36px' }}
        >
          {['Seguro', 'Garantido', 'Acesso imediato'].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: '#2563EB' }} />
              <span style={{ color: '#64748B', fontSize: '11px' }}>{t}</span>
            </div>
          ))}
        </motion.div>

        {/* Testimonials divider */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(30,41,59,0.6))' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: '#1E3A5F' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(30,41,59,0.6), transparent)' }} />
        </motion.div>

        {/* Testimonials carousel */}
        <motion.div variants={itemVariants}>
          <TestimonialsCarousel />
        </motion.div>

      </div>
    </motion.div>
  )
}
