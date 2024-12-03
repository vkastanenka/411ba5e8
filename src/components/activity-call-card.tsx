'use client'

// components
import { ArchiveButton } from '@/components/archive-button'
import { CallButton } from '@/components/call-button'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@/components/ui/dialog'

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

interface ActivityCardModalProps {
  call: ActivityCall
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ActivityCardModal: React.FC<ActivityCardModalProps> = ({
  call,
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={(e) => setIsModalOpen(e)}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <DialogTitle>
          {`${call.call_type === 'answered' ? 'Call' : 'Missed call'} ${
            call.direction === 'outbound' ? 'to' : 'from'
          } ${call.from}`}
        </DialogTitle>
        <DialogDescription className="text-base">
          Call details
        </DialogDescription>
        <div className="flex flex-col gap-4 [&>div]:flex [&>div]:items-center [&>div]:gap-1">
          <div>
            <p className="text-sm">Call made:</p>
            <p className="text-sm">
              {formatDate(parseISO(call.created_at), 'MMM dd yyyy, h:mm aaa')}
            </p>
          </div>
          <div>
            <p className="text-sm">Call type:</p>
            <p className="text-sm">{call.call_type}</p>
          </div>
          <div>
            <p className="text-sm">Call direction:</p>
            <p className="text-sm">{call.direction}</p>
          </div>
          <div>
            <p className="text-sm">Call duration:</p>
            <p className="text-sm">{call.duration}</p>
          </div>
          <div>
            <p className="text-sm">Aircall number:</p>
            <p className="text-sm">{call.via}</p>
          </div>
          <ArchiveButton
            calls={[call]}
            onSuccess={() => setIsModalOpen(false)}
            type={call.is_archived ? 'unarchive' : 'archive'}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
