// types
import { ActivityCall } from '@/types/activity'
import { ClassValue } from 'clsx'

// utils
import { clsx } from 'clsx'
import { parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Sorts activity calls by their dates descending
export const sortCalls = (calls: ActivityCall[]) => {
  return calls.sort(function (a, b) {
    return parseISO(b.created_at).valueOf() - parseISO(a.created_at).valueOf()
  })
}
