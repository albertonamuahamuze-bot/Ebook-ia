import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveAnswer(sessionId, field, value) {
  if (!supabaseUrl || !supabaseAnonKey) return

  const { data: existing } = await supabase
    .from('funnel_answers')
    .select('id')
    .eq('session_id', sessionId)
    .single()

  if (existing) {
    await supabase
      .from('funnel_answers')
      .update({ [field]: value })
      .eq('session_id', sessionId)
  } else {
    await supabase
      .from('funnel_answers')
      .insert({ session_id: sessionId, [field]: value })
  }
}

export async function markCompleted(sessionId) {
  if (!supabaseUrl || !supabaseAnonKey) return

  await supabase
    .from('funnel_answers')
    .update({ completed: true })
    .eq('session_id', sessionId)
}

export async function getStats() {
  if (!supabaseUrl || !supabaseAnonKey) return null

  const { data: all } = await supabase
    .from('funnel_answers')
    .select('*')
    .order('created_at', { ascending: false })

  return all || []
}
