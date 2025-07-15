import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { url, type } = body

  if (!url || !type) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Missing data' }))
  }

  const filePath = join(process.cwd(), 'media.json')
  let data: any[] = []

  try {
    const file = await readFile(filePath, 'utf-8')
    data = JSON.parse(file)
  } catch (e) {
    data = []
  }

  data.push({ url, type, createdAt: new Date().toISOString() })

  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')

  return { success: true }
})
