'use client'

// svg
import { Phone } from 'lucide-react'

// utils
import { useToast } from '@/hooks/use-toast'

// types
import { ActivityCall } from '@/types/activity'

interface CallButtonProps {
  call: ActivityCall
}

export const CallButton: React.FC<CallButtonProps> = ({ call }) => {
  const { toast } = useToast()

  return (
    <button
      className="button-text"
      onClick={() => {
        toast({
          title: 'Calling!',
          description: `Outgoing call to ${
            call.direction === 'inbound' ? call.from : call.to
          }.`,
        })
      }}
    >
      <Phone />
    </button>
  )
}
