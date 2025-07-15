import { supabase } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { url, type } = body

  console.log('📥 Data received:', body)

  if (!url || !type) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Missing data' }))
  }

  const { error } = await supabase.from('media').insert([{ url, type }])

  if (error) {
    console.error('❌ Supabase Insert Error:', error)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Insert failed' }))
  }

  return { success: true }
})
