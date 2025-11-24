import { stat } from 'fs/promises'

export const fileExists = async (path: string) => {
  try {
    await stat(path) // Tries to get file stats
    return true
  } catch (error: any) {
    // 'ENOENT' means "Error: No Entry" (file doesn't exist)
    if (error?.code === 'ENOENT') {
      return false
    }
    // Re-throw other unexpected errors
    throw error
  }
}
