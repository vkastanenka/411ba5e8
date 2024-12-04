'use client'

// actions
import { patchActivityCall } from '@/actions/activity'

// components
import { LoaderCircle } from 'lucide-react'

// utils
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

// types
import { ActivityCall } from '@/types/activity'

interface ArchiveCallButtonProps {
  calls: ActivityCall[]
  type: 'archive' | 'unarchive'
  onSuccess?: () => void
}

export const ArchiveCallButton: React.FC<ArchiveCallButtonProps> = ({
  calls,
  type,
  onSuccess,
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const action = async () => {
    const errors = []

    await setIsLoading(true)
    const reqBody = { is_archived: type === 'archive' }

    // Patch all calls provided
    const patchResponses = await Promise.all(
      calls.map(async (call) => {
        return await patchActivityCall(call.id, reqBody)
      })
    )

    // For each response, if there is an error, push to errors
    patchResponses.forEach((res) => {
      if (res.status !== 200) errors.push(res)
    })

    // If errors, alert user
    if (errors.length > 0) {
      router.refresh()
      toast({
        title: 'Error!',
        description: `Unable to update ${errors.length} calls.`,
      })
      await setIsLoading(false)
      return
    }

    router.refresh()

    toast({
      title: 'Success!',
      description: 'Calls successfully updated.',
    })

    await setIsLoading(false)

    if (onSuccess) onSuccess()
  }

  return (
    <button
      onClick={action}
      disabled={isLoading}
      className="button-text border-[1px]"
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        `${type === 'archive' ? 'Archive' : 'Unarchive'} ${
          calls.length === 1 ? 'Call' : 'All Calls'
        }`
      )}
    </button>
  )
}
