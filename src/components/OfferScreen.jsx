import { useState } from 'react'
import { motion } from 'framer-motion'

const CHECKOUT_URL = 'https://checkout.escalepay.com/6050251'
const WHATSAPP_URL = 'https://wa.me/258855716631'

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function SectionNum({ n }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '11px', fontWeight: 700,
        letterSpacing: '3px', color: '#3B82F6',
      }}>
        {String(n).padStart(2, '0')}
      </span>
      <div style={{ width: '28px', height: '1px', background: 'rgba(59,130,246,0.35)' }} />
    </div>
  )
}

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '40px 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(30,41,59,0.8))' }} />
      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1E3A5F' }} />
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(30,41,59,0.8), transparent)' }} />
    </div>
  )
}

function CTAButton({ label = '🚀 Quero Começar Agora', large = false }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary block w-full text-center rounded-2xl font-bold glow-blue"
      style={{
        color: '#ffffff',
        textDecoration: 'none',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: large ? 'clamp(1rem, 3.5vw, 1.15rem)' : 'clamp(0.9rem, 3vw, 1.05rem)',
        letterSpacing: '-0.01em',
        padding: large ? '18px 24px' : '15px 20px',
        display: 'block',
      }}
      onClick={() => {
        if (typeof fbq === 'function') fbq('track', 'InitiateCheckout')
        if (typeof ttq !== 'undefined') ttq.track('InitiateCheckout')
      }}
    >
      {label}
    </a>
  )
}

// ─── Ebook cover ──────────────────────────────────────────────────────────────

function EbookCover() {
  const [imgError, setImgError] = useState(false)

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', inset: '-24px',
        background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 68%)',
        filter: 'blur(16px)', zIndex: 0, borderRadius: '50%'
      }} />
      <div
        className="float-anim"
        style={{
          position: 'relative', zIndex: 1,
          width: '148px', aspectRatio: '2/3',
          borderRadius: '4px 12px 12px 4px', overflow: 'hidden',
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
              marginBottom: '14px', boxShadow: '0 0 14px rgba(37,99,235,0.45)'
            }}>
              <span style={{ fontSize: '20px' }}>📱</span>
            </div>
            <p style={{ fontSize: '7.5px', fontWeight: 700, letterSpacing: '2.5px', color: '#60A5FA', textTransform: 'uppercase', marginBottom: '8px' }}>
              Ebook Premium
            </p>
            <p style={{ fontSize: '10px', fontWeight: 700, color: '#F8FAFC', lineHeight: 1.45, fontFamily: "'Space Grotesk', sans-serif" }}>
              Transforma o Teu Telemóvel em Fonte de Renda com IA
            </p>
            <div style={{ width: '28px', height: '2px', borderRadius: '1px', marginTop: '12px', background: 'linear-gradient(90deg, #2563EB, #60A5FA)' }} />
          </div>
        )}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '10px', height: '100%', background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.08) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '35%', height: '100%', background: 'linear-gradient(135deg, transparent 55%, rgba(255,255,255,0.035) 100%)', pointerEvents: 'none' }} />
      </div>
    </div>
  )
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section>
      <Reveal>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px',
            background: 'rgba(37,99,235,0.1)',
            border: '1px solid rgba(37,99,235,0.28)',
          }}>
            <div className="pulse-dot" style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#60A5FA', boxShadow: '0 0 5px rgba(96,165,250,0.7)'
            }} />
            <span style={{
              fontSize: '10px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '2px',
              color: '#60A5FA', fontFamily: "'Space Grotesk', sans-serif"
            }}>
              Oportunidade Exclusiva
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 style={{
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          fontSize: 'clamp(1.5rem, 5.5vw, 2.2rem)',
          fontWeight: 800, letterSpacing: '-0.025em',
          lineHeight: '1.22', color: '#F8FAFC',
          textAlign: 'center', marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          O teu{' '}
          <span style={{ color: '#3B82F6' }}>telemóvel</span>
          {' '}pode ser o início da tua próxima{' '}
          <span style={{ color: '#3B82F6' }}>fonte de renda.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p style={{
          textAlign: 'center', color: '#94A3B8',
          fontSize: 'clamp(0.875rem, 2.8vw, 0.95rem)',
          lineHeight: '1.7', marginBottom: '36px',
        }}>
          Aprende a usar Inteligência Artificial para criar oportunidades reais —
          {' '}mesmo começando do zero, usando apenas o telemóvel.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <EbookCover />
        </div>
      </Reveal>
    </section>
  )
}

// ─── Section 2: Problema ──────────────────────────────────────────────────────

function ProblemaSection() {
  const items = [
    { icon: '📱', label: 'TikTok', time: '2h+' },
    { icon: '📸', label: 'Instagram', time: '1h+' },
    { icon: '▶️', label: 'YouTube', time: '2h+' },
    { icon: '👥', label: 'Facebook', time: '1h+' },
  ]

  return (
    <section>
      <Reveal>
        <SectionNum n={2} />
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.2rem, 4.5vw, 1.65rem)',
          fontWeight: 800, lineHeight: '1.2',
          color: '#F8FAFC', marginBottom: '20px',
          textTransform: 'uppercase',
        }}>
          A maioria usa o telemóvel para{' '}
          <span style={{ color: '#3B82F6' }}>DISTRAIR-SE.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.06}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(15,23,42,0.7)',
                border: '1px solid rgba(30,41,59,0.8)',
                borderRadius: '12px',
                padding: '14px 12px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <div>
                <p style={{ color: '#F1F5F9', fontSize: '12px', fontWeight: 600 }}>{item.label}</p>
                <p style={{ color: '#EF4444', fontSize: '11px', fontWeight: 700 }}>{item.time} por dia</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div style={{
          background: 'rgba(37,99,235,0.08)',
          border: '1px solid rgba(37,99,235,0.25)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13.5px', fontWeight: 700,
            color: '#F8FAFC',
          }}>
            Enquanto isso,{' '}
            <span style={{ color: '#3B82F6' }}>outros estão aprendendo IA</span>
            {' '}e criando renda.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

// ─── Section 3: Solução ───────────────────────────────────────────────────────

function SolucaoSection() {
  const bullets = [
    { icon: '📱', text: 'Apenas o telemóvel que já tens' },
    { icon: '🤖', text: 'Ferramentas de IA gratuitas e acessíveis' },
    { icon: '📈', text: 'Estratégias que funcionam desde o primeiro dia' },
    { icon: '💰', text: 'Negócios digitais sem precisar de capital' },
  ]

  return (
    <section>
      <Reveal>
        <SectionNum n={3} />
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.2rem, 4.5vw, 1.65rem)',
          fontWeight: 800, lineHeight: '1.2',
          color: '#F8FAFC', marginBottom: '20px',
          textTransform: 'uppercase',
        }}>
          Hoje já é possível criar{' '}
          <span style={{ color: '#3B82F6' }}>RENDA USANDO IA.</span>
        </h2>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {bullets.map((b, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div style={{
              background: 'rgba(15,23,42,0.7)',
              border: '1px solid rgba(30,41,59,0.8)',
              borderRadius: '12px',
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{b.icon}</span>
              <p style={{ color: '#E2E8F0', fontSize: '13.5px', fontWeight: 500 }}>{b.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ─── Section 4: O Que Vais Receber ───────────────────────────────────────────

function BenefitsSection() {
  const benefits = [
    { icon: '📘', n: '01', title: 'Ebook Premium', desc: 'Guia completo passo a passo' },
    { icon: '🤖', n: '02', title: 'Prompts Estratégicos', desc: 'Prontos para usar' },
    { icon: '🚀', n: '03', title: 'Estratégias Reais', desc: 'Aplicáveis desde o primeiro dia' },
    { icon: '♾️', n: '04', title: 'Acesso Vitalício', desc: 'Conteúdo sempre actualizado' },
  ]

  return (
    <section>
      <Reveal>
        <SectionNum n={4} />
        <p style={{
          fontSize: '10px', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '2px',
          color: '#60A5FA', marginBottom: '16px',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          O que vais receber
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {benefits.map((b, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(15,23,42,0.8)',
                border: '1px solid rgba(37,99,235,0.15)',
                borderRadius: '16px',
                padding: '16px 14px',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <span style={{
                position: 'absolute', top: '10px', right: '12px',
                fontSize: '10px', fontWeight: 700,
                color: 'rgba(59,130,246,0.25)', letterSpacing: '1px',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {b.n}
              </span>
              <span style={{ fontSize: '22px', lineHeight: 1, display: 'block', marginBottom: '10px' }}>{b.icon}</span>
              <p style={{ color: '#F1F5F9', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>{b.title}</p>
              <p style={{ color: '#64748B', fontSize: '10.5px', lineHeight: '1.4' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ─── Section 5: Prova Social ──────────────────────────────────────────────────

function ProvaSection() {
  const testimonials = [
    {
      name: 'Carlos M.',
      initial: 'C',
      gradient: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
      quote: 'Comecei do zero e em 2 semanas já aplicava IA no meu negócio. Nunca pensei que fosse tão simples.',
    },
    {
      name: 'Vanessa T.',
      initial: 'V',
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
      quote: 'O conteúdo é simples, moderno e direto ao ponto. Recomendo a qualquer pessoa com telemóvel.',
    },
  ]

  return (
    <section>
      <Reveal>
        <SectionNum n={5} />
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.2rem, 4.5vw, 1.65rem)',
          fontWeight: 800, lineHeight: '1.2',
          color: '#F8FAFC', marginBottom: '6px',
          textTransform: 'uppercase',
        }}>
          Quem aprende cedo{' '}
          <span style={{ color: '#3B82F6' }}>DOMINA O FUTURO.</span>
        </h2>
        <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '20px', lineHeight: '1.5' }}>
          Não é sorte. É conhecimento aplicado com direcção.
        </p>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.09}>
            <div style={{
              background: 'rgba(15,23,42,0.72)',
              border: '1px solid rgba(37,99,235,0.18)',
              borderRadius: '16px',
              padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: t.gradient, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid rgba(37,99,235,0.3)',
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                    {t.initial}
                  </span>
                </div>
                <div>
                  <p style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 600, marginBottom: '3px' }}>{t.name}</p>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p style={{
                color: '#CBD5E1', fontSize: '13.5px',
                lineHeight: '1.65', fontStyle: 'italic',
                fontFamily: "'Inter', sans-serif",
              }}>
                "{t.quote}"
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ─── Section 6: Oferta + Garantia ────────────────────────────────────────────

function OfertaSection() {
  return (
    <section>
      <Reveal>
        <div style={{
          background: 'rgba(15,23,42,0.8)',
          border: '1px solid rgba(37,99,235,0.22)',
          borderRadius: '24px',
          padding: '28px 22px',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{
              textTransform: 'uppercase', fontWeight: 700, letterSpacing: '2.5px',
              color: '#F59E0B', fontSize: '9.5px', fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Oferta de Lançamento
            </span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#F59E0B' }} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ color: '#475569', fontSize: '13px', textDecoration: 'line-through', marginBottom: '4px' }}>
              1.500 MT
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px' }}>
              <span style={{ color: '#64748B', fontSize: '12px', fontWeight: 500 }}>Por apenas</span>
              <span style={{
                fontSize: 'clamp(2rem, 8vw, 2.75rem)',
                fontWeight: 800, color: '#F8FAFC',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.04em', lineHeight: 1,
              }}>
                697 MT
              </span>
            </div>
          </div>

          <CTAButton large />

          <p style={{ textAlign: 'center', marginTop: '12px', color: '#475569', fontSize: '11px' }}>
            Acesso imediato após a confirmação
          </p>
        </div>
      </Reveal>

      {/* Guarantee */}
      <Reveal delay={0.08}>
        <div style={{
          background: 'rgba(34,197,94,0.05)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex', alignItems: 'flex-start', gap: '14px',
        }}>
          <div style={{ flexShrink: 0, marginTop: '2px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6V12C4 15.31 7.58 19.1 12 20.93C16.42 19.1 20 15.31 20 12V6L12 2Z"
                fill="rgba(34,197,94,0.15)" stroke="#22C55E" strokeWidth="1.5"/>
              <path d="M9 12l2 2 4-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p style={{
              color: '#22C55E', fontSize: '12px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px',
              marginBottom: '5px', fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Garantia de 7 dias
            </p>
            <p style={{ color: '#94A3B8', fontSize: '12.5px', lineHeight: '1.6' }}>
              Se não ficares satisfeito, devolvemos o teu dinheiro. Sem perguntas.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ─── Section 7: Instruções de Pagamento ──────────────────────────────────────

function PagamentoSection() {
  const steps = [
    { n: '01', text: 'Clica em "Quero Começar Agora"' },
    { n: '02', text: 'Escolhe M-Pesa ou E-Mola' },
    { n: '03', text: 'Confirma o pagamento e acede imediatamente' },
  ]

  return (
    <section>
      <Reveal>
        <p style={{
          fontSize: '10px', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '2px',
          color: '#60A5FA', marginBottom: '6px',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          Pagamento
        </p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.1rem, 4vw, 1.45rem)',
          fontWeight: 700, color: '#F8FAFC',
          marginBottom: '20px',
        }}>
          Como pagar em 3 passos simples
        </h2>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div style={{
              background: 'rgba(15,23,42,0.7)',
              border: '1px solid rgba(30,41,59,0.8)',
              borderRadius: '12px',
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(37,99,235,0.1)',
                border: '1px solid rgba(37,99,235,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '11px', fontWeight: 700, color: '#3B82F6',
              }}>
                {s.n}
              </div>
              <p style={{ color: '#E2E8F0', fontSize: '13.5px', fontWeight: 500 }}>{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Payment method badges */}
      <Reveal delay={0.22}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{
            flex: 1,
            background: 'rgba(15,23,42,0.7)',
            border: '1px solid rgba(30,41,59,0.8)',
            borderRadius: '12px',
            padding: '13px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px',
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '6px',
              background: '#E30613',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M1.5 8.5C1.5 5.46 3.96 3 7 3h10c3.04 0 5.5 2.46 5.5 5.5v7c0 3.04-2.46 5.5-5.5 5.5H7c-3.04 0-5.5-2.46-5.5-5.5v-7z"/>
                <path d="M8 12h8M8 8.5h5" stroke="#E30613" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
              M-Pesa
            </span>
          </div>

          <div style={{
            flex: 1,
            background: 'rgba(15,23,42,0.7)',
            border: '1px solid rgba(30,41,59,0.8)',
            borderRadius: '12px',
            padding: '13px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px',
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '6px',
              background: '#FF6B1A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <span style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
              E-Mola
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ─── Section 8: CTA Final ─────────────────────────────────────────────────────

function CTAFinalSection() {
  return (
    <section>
      <Reveal>
        <CTAButton large label="🚀 Quero Começar Agora" />

        <p style={{ textAlign: 'center', marginTop: '12px', color: '#475569', fontSize: '11px', marginBottom: '20px' }}>
          Acesso imediato após confirmação
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '20px', marginBottom: '36px',
        }}>
          {['Seguro', 'Garantido', 'Acesso imediato'].map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ color: '#64748B', fontSize: '11px' }}>{label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div style={{
          borderTop: '1px solid rgba(30,41,59,0.6)',
          paddingTop: '20px',
          textAlign: 'center',
        }}>
          <p style={{ color: '#334155', fontSize: '11px', lineHeight: '1.9' }}>
            100% Online · Acesso Imediato · 7 Dias de Garantia · Conteúdo Actualizado
          </p>
        </div>
      </Reveal>
    </section>
  )
}

// ─── WhatsApp floating button ─────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed', bottom: '24px', right: '20px', zIndex: 9998,
        width: '52px', height: '52px', borderRadius: '50%',
        background: '#25D366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.35)',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.55), 0 2px 8px rgba(0,0,0,0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.35)'
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function OfferScreen() {
  return (
    <>
      <WhatsAppButton />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          paddingTop: '72px',
          paddingBottom: '60px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <div style={{ maxWidth: '440px', margin: '0 auto' }}>
          <HeroSection />
          <Divider />
          <ProblemaSection />
          <Divider />
          <SolucaoSection />
          <Divider />
          <BenefitsSection />
          <Divider />
          <ProvaSection />
          <Divider />
          <OfertaSection />
          <Divider />
          <PagamentoSection />
          <Divider />
          <CTAFinalSection />
        </div>
      </motion.div>
    </>
  )
}
