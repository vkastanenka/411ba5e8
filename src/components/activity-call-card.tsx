// svg
import { Phone } from 'lucide-react'
import { PhoneIncoming, PhoneOutgoing } from '@/components/svg'

// utils
import { format as formatDate, parseISO } from 'date-fns'

// types
import { ActivityCall } from '@/types/activity'

interface ActivityCallCardProps {
  call: ActivityCall
}

export const ActivityCallCard: React.FC<ActivityCallCardProps> = ({
  call,
  ...props
}) => {
  return (
    <div
      className="p-2 border-[1px] rounded-md bg-slate-100 flex items-center gap-4"
      {...props}
    >
      {call.direction === 'inbound' ? (
        <PhoneIncoming callType={call.call_type} />
      ) : (
        <PhoneOutgoing callType={call.call_type} />
      )}
      <div className="flex flex-col gap-1 grow">
        <p className="text-[16px]">{call.from}</p>
        <p className="text-[12px]">
          {formatDate(parseISO(call.created_at), 'MMM dd, h:mm aaa')}
        </p>
      </div>
      <button>
        <Phone />
      </button>
    </div>
  )
}
