import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function validateCSVColumns(headers: string[]): { isValid: boolean; message: string } {
  if (headers.length < 5) {
    return {
      isValid: false,
      message: 'CSV must have at least 5 columns'
    }
  }
  
  return {
    isValid: true,
    message: 'CSV validation passed'
  }
}