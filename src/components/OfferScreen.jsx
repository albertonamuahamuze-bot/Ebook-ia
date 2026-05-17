import { motion } from 'framer-motion'

const CHECKOUT_URL = 'https://pay.escale.co/'

const benefits = [
  { icon: '📘', title: 'Ebook Premium', desc: 'Guia completo passo a passo' },
  { icon: '🔐', title: 'Área Exclusiva', desc: 'Acesso vitalício ao conteúdo' },
  { icon: '🤖', title: 'Prompts Prontos', desc: 'Copiar, colar e lucrar' },
  { icon: '👥', title: 'Comunidade Exclusiva', desc: 'Rede de apoio e crescimento' },
  { icon: '🎬', title: 'Ferramentas e Vídeos', desc: 'Recursos práticos e atualizados' },
  { icon: '🚀', title: 'Estratégias Práticas', desc: 'Aplicáveis desde o primeiro dia' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export default function OfferScreen() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen w-full flex flex-col items-center px-5 py-14 relative z-10"
    >
      <div className="w-full max-w-lg mx-auto">

        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(37, 99, 235, 0.12)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              color: '#60A5FA'
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#60A5FA', boxShadow: '0 0 6px rgba(96,165,250,0.8)' }} />
            Oportunidade Exclusiva
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="text-center font-bold leading-tight mb-5"
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: 'clamp(1.75rem, 6vw, 2.6rem)',
            letterSpacing: '-0.025em',
            lineHeight: '1.2'
          }}
        >
          <span className="gradient-text">O teu telemóvel</span>
          <br />
          <span style={{ color: '#F8FAFC' }}>pode ser o início da tua</span>
          <br />
          <span style={{ color: '#F8FAFC' }}>próxima fonte de renda.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-center leading-relaxed mb-10"
          style={{
            color: '#CBD5E1',
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            lineHeight: '1.75'
          }}
        >
          Descobre como usar Inteligência Artificial para criar oportunidades reais usando apenas o telemóvel
          — mesmo começando do zero.
        </motion.p>

        {/* Ebook visual mockup */}
        <motion.div variants={itemVariants} className="flex justify-center mb-10">
          <div className="relative">
            {/* Glow behind */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl"
              style={{ background: 'rgba(37, 99, 235, 0.2)', transform: 'scale(1.1)' }}
            />
            {/* Card */}
            <div
              className="relative w-52 rounded-3xl overflow-hidden float-anim"
              style={{
                background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(37,99,235,0.15)',
                aspectRatio: '3/4'
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
                    boxShadow: '0 0 20px rgba(37,99,235,0.5)'
                  }}
                >
                  <span style={{ fontSize: '24px' }}>📱</span>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#60A5FA' }}>
                  Ebook Premium
                </p>
                <p className="font-bold leading-tight text-sm" style={{ color: '#F8FAFC', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Transforma o Teu Telemóvel em Fonte de Renda com IA
                </p>
                <div className="mt-4 w-12 h-0.5 rounded" style={{ background: 'linear-gradient(90deg, #2563EB, #60A5FA)' }} />
              </div>
              {/* Shine effect */}
              <div
                className="absolute top-0 right-0 w-20 h-full"
                style={{
                  background: 'linear-gradient(135deg, transparent 60%, rgba(255,255,255,0.03) 100%)',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Benefits grid */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#60A5FA' }}>
            O que vais receber
          </p>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-card rounded-2xl p-4 flex flex-col gap-2"
              >
                <span style={{ fontSize: '20px' }}>{b.icon}</span>
                <p className="font-semibold text-xs leading-tight" style={{ color: '#F8FAFC' }}>
                  {b.title}
                </p>
                <p className="text-xs leading-snug" style={{ color: '#94A3B8' }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #1E293B)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2563EB' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #1E293B, transparent)' }} />
        </motion.div>

        {/* Social proof */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <p className="text-xs" style={{ color: '#CBD5E1' }}>
            Milhares já estão a transformar o telemóvel em oportunidade
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="sticky bottom-5">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block w-full text-center py-4 px-6 rounded-2xl font-bold text-base glow-blue"
            style={{
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              fontSize: 'clamp(0.95rem, 3vw, 1.05rem)'
            }}
          >
            🚀 Quero Começar Agora
          </a>
          <p className="text-center text-xs mt-3" style={{ color: '#64748B' }}>
            Acesso imediato após a confirmação
          </p>
        </motion.div>

        {/* Bottom trust signals */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-5 mt-8">
          {['Seguro', 'Garantido', 'Acesso imediato'].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: '#2563EB' }} />
              <span className="text-xs" style={{ color: '#94A3B8' }}>{t}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  )
}
