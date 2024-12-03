// utils
import { cn } from '@/lib/utils'

interface Card {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<Card> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'bg-card',
        'rounded-[3px]',
        'shadow-[0_0_5px_0_rgba(0,0,0,0.9)]',
        className
      )}
    >
      {children}
    </div>
  )
}
