'use client'

// components
import { CallButton } from '@/components/buttons/call-button'
import { ActivityCardModal } from '@/components/modals/activity-call-modal'

// svg
import { PhoneIncoming, PhoneOutgoing } from '@/components/svg'

// utils
import { useState } from 'react'
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div
      className="border-[1px] rounded-md bg-background flex items-center gap-4"
      {...props}
    >
      <button
        className="button-text justify-start gap-4 grow"
        onClick={() => setIsModalOpen((prevState) => !prevState)}
      >
        {call.direction === 'inbound' ? (
          <PhoneIncoming callType={call.call_type} />
        ) : (
          <PhoneOutgoing callType={call.call_type} />
        )}
        <div className="flex flex-col gap-1 items-start">
          <p>{call.from}</p>
          <p className="text-xs">
            {formatDate(parseISO(call.created_at), 'MMM dd, h:mm aaa')}
          </p>
        </div>
      </button>
      <CallButton call={call} />
      {isModalOpen && (
        <ActivityCardModal
          call={call}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  )
}
