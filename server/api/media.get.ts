import { supabase } from '~/server/utils/supabase'

export default defineEventHandler(async () => {
  const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
})
