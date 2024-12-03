'use client'

// actions
import { getActivityCall, patchActivityCall } from '@/actions/activity'

// components
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@/components/ui/dialog'

// svg
import { LoaderCircle, Phone } from 'lucide-react'
import { PhoneIncoming, PhoneOutgoing } from '@/components/svg'

// utils
import { useState, useEffect } from 'react'
import { format as formatDate, parseISO } from 'date-fns'

// types
import { ActivityCall } from '@/types/activity'
import { useRouter } from 'next/navigation'

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
      className="p-2 border-[1px] rounded-md bg-slate-100 flex items-center gap-4"
      {...props}
    >
      <button
        className="transition-colors flex items-center gap-4 grow hover:bg-slate-200 focus:bg-slate-200"
        onClick={() => setIsModalOpen((prevState) => !prevState)}
      >
        {call.direction === 'inbound' ? (
          <PhoneIncoming callType={call.call_type} />
        ) : (
          <PhoneOutgoing callType={call.call_type} />
        )}
        <div className="flex flex-col gap-1 items-start">
          <p className="text-[16px]">{call.from}</p>
          <p className="text-[12px]">
            {formatDate(parseISO(call.created_at), 'MMM dd, h:mm aaa')}
          </p>
        </div>
      </button>
      <button className="transition-colors hover:bg-slate-200 focus:bg-slate-200">
        <Phone />
      </button>
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
  const router = useRouter()

  const patchCall = async () => {
    const res = await patchActivityCall(call.id, {
      is_archived: !call.is_archived,
    })

    if (res.status !== 200) {
      window.alert('Error updating call!')
    }

    await router.refresh()

    setIsModalOpen(false)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={(e) => setIsModalOpen(e)}>
      <DialogContent className="bg-card flex flex-col gap-4 min-h-[394px]">
        <DialogTitle>
          {`${call.call_type === 'answered' ? 'Call' : 'Missed call'} ${
            call.direction === 'outbound' ? 'to' : 'from'
          } ${call.from}`}
        </DialogTitle>
        <DialogDescription>Call details</DialogDescription>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[14px]">Call made:</p>
            <p className="text-[14px]">
              {formatDate(parseISO(call.created_at), 'MMM dd yyyy, h:mm aaa')}
            </p>
          </div>
          <div>
            <p className="text-[14px]">Call type:</p>
            <p className="text-[14px]">{call.call_type}</p>
          </div>
          <div>
            <p className="text-[14px]">Call direction:</p>
            <p className="text-[14px]">{call.direction}</p>
          </div>
          <div>
            <p className="text-[14px]">Call duration:</p>
            <p className="text-[14px]">{call.duration}</p>
          </div>
          <div>
            <p className="text-[14px]">Aircall number:</p>
            <p className="text-[14px]">{call.via}</p>
          </div>
          <button
            className="text-[16px] p-2 border-[1px] rounded-md bg-slate-100"
            onClick={patchCall}
          >
            {`${call.is_archived ? 'Unarchive' : 'Archive'} call`}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
