'use client'

// components
import { ArchiveCallButton } from '@/components/buttons/archive-call-button'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@/components/ui/dialog'

// utils
import { format as formatDate, parseISO } from 'date-fns'

// types
import { ActivityCall } from '@/types/activity'

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
          <ArchiveCallButton
            calls={[call]}
            onSuccess={() => setIsModalOpen(false)}
            type={call.is_archived ? 'unarchive' : 'archive'}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
