import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DAY_NAMES, MONTH_NAMES } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEUR(amount: number): string {
  return amount.toFixed(2).replace('.', ',')
}

export function getNextWeekdays(count: number): { day: string; date: string; dateNum: number; month: string }[] {
  const today = new Date()
  const result: { day: string; date: string; dateNum: number; month: string }[] = []
  let i = 0
  while (result.length < count) {
    i++
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    const dayOfWeek = d.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      result.push({
        day: DAY_NAMES[dayOfWeek],
        date: `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`,
        dateNum: d.getDate(),
        month: MONTH_NAMES[d.getMonth()],
      })
    }
  }
  return result
}

export function isSameDayDeliveryAvailable(): boolean {
  const now = new Date()
  const cetOffset = 1
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const cet = new Date(utc + 3600000 * cetOffset)
  return cet.getHours() < 10
}
