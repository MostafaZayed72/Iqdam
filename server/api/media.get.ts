import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const filePath = join(process.cwd(), 'media.json')
  try {
    const file = await readFile(filePath, 'utf-8')
    const data = JSON.parse(file)
    return data.reverse() // أحدث الملفات أولًا
  } catch (e) {
    return []
  }
})
