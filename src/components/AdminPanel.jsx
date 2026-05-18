import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getStats } from '../lib/supabase'

function countAnswers(data, field) {
  const counts = {}
  data.forEach(row => {
    const val = row[field]
    if (val) counts[val] = (counts[val] || 0) + 1
  })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

function StatCard({ label, value, sub, color = '#2563EB' }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: '#94A3B8' }}>{label}</p>
      <p className="text-3xl font-bold" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: '#64748B' }}>{sub}</p>}
    </div>
  )
}

function AnswerBar({ answer, count, total }) {
  const pct = total ? Math.round((count / total) * 100) : 0
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium" style={{ color: '#CBD5E1', lineHeight: 1.4 }}>{answer}</span>
        <span className="text-xs font-bold ml-3 flex-shrink-0" style={{ color: '#60A5FA' }}>{count} ({pct}%)</span>
      </div>
      <div className="w-full rounded-full h-1.5" style={{ background: '#1E293B' }}>
        <motion.div
          className="h-1.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, #2563EB, #60A5FA)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

const QUESTIONS = [
  { field: 'question_1', label: 'Pergunta 1 — Abertura' },
  { field: 'question_2', label: 'Pergunta 2 — Situação' },
  { field: 'question_3', label: 'Pergunta 3 — Interesse' },
  { field: 'question_4', label: 'Pergunta 4 — Motivação' },
]

export default function AdminPanel({ onExit, onReset }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStats()
      .then(res => {
        if (res === null) setError('Supabase não configurado. Adiciona as variáveis de ambiente.')
        else setData(res)
      })
      .catch(() => setError('Erro ao carregar dados.'))
      .finally(() => setLoading(false))
  }, [])

  const total = data?.length || 0
  const completed = data?.filter(r => r.completed).length || 0
  const completionRate = total ? Math.round((completed / total) * 100) : 0
  const recent = data?.slice(0, 5) || []

  return (
    <div className="min-h-screen w-full px-5 py-10 relative z-10">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
              Painel Admin
            </h1>
            <p className="text-xs mt-1" style={{ color: '#64748B' }}>Análise do funil de vendas</p>
          </div>
          <div className="flex gap-2">
            {onReset && (
              <button
                onClick={onReset}
                className="text-xs px-4 py-2 rounded-xl font-medium"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171' }}
              >
                Reset Funil
              </button>
            )}
            <button
              onClick={onExit}
              className="text-xs px-4 py-2 rounded-xl font-medium"
              style={{ background: '#0F172A', border: '1px solid #1E293B', color: '#CBD5E1' }}
            >
              Sair
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex gap-2">
              {[0,1,2].map(i => (
                <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: '#2563EB' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-sm" style={{ color: '#F87171' }}>{error}</p>
          </div>
        )}

        {!loading && !error && data && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <StatCard label="Total Sessões" value={total} sub="respostas registadas" />
              <StatCard label="Completadas" value={completed} color="#22C55E" sub={`${completionRate}% taxa conclusão`} />
              <StatCard label="Taxa Conclusão" value={`${completionRate}%`} color="#F59E0B" sub="funil completo" />
              <StatCard label="Em Progresso" value={total - completed} color="#94A3B8" sub="abandonaram" />
            </div>

            {/* Progress bar total */}
            <div className="glass-card rounded-2xl p-5 mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#94A3B8' }}>Taxa de Conclusão</p>
                <span className="text-xs font-bold" style={{ color: '#60A5FA' }}>{completionRate}%</span>
              </div>
              <div className="w-full rounded-full h-2" style={{ background: '#1E293B' }}>
                <motion.div
                  className="h-2 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #2563EB, #60A5FA)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Per-question breakdown */}
            {QUESTIONS.map(({ field, label }) => {
              const counts = countAnswers(data, field)
              const qtotal = counts.reduce((s, [, c]) => s + c, 0)
              return (
                <div key={field} className="glass-card rounded-2xl p-5 mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#60A5FA' }}>
                    {label}
                  </p>
                  {counts.length === 0 ? (
                    <p className="text-xs" style={{ color: '#64748B' }}>Sem dados ainda.</p>
                  ) : (
                    counts.map(([ans, cnt]) => (
                      <AnswerBar key={ans} answer={ans} count={cnt} total={qtotal} />
                    ))
                  )}
                </div>
              )
            })}

            {/* Recent sessions */}
            {recent.length > 0 && (
              <div className="glass-card rounded-2xl p-5 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#60A5FA' }}>
                  Sessões Recentes
                </p>
                <div className="flex flex-col gap-2">
                  {recent.map((row) => (
                    <div key={row.id} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1E293B' }}>
                      <div>
                        <p className="text-xs font-medium" style={{ color: '#F8FAFC' }}>
                          {row.session_id?.slice(0, 12)}…
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
                          {new Date(row.created_at).toLocaleString('pt-PT')}
                        </p>
                      </div>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: row.completed ? 'rgba(34,197,94,0.1)' : 'rgba(148,163,184,0.1)',
                          color: row.completed ? '#22C55E' : '#94A3B8',
                          border: `1px solid ${row.completed ? 'rgba(34,197,94,0.2)' : 'rgba(148,163,184,0.1)'}`
                        }}
                      >
                        {row.completed ? 'Completo' : 'Parcial'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
