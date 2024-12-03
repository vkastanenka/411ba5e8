'use client'

// actions
import { patchActivityCall } from '@/actions/activity'

// utils
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

// types
import { ActivityCall } from '@/types/activity'

interface ArchiveButtonProps {
  calls: ActivityCall[]
  type: 'archive' | 'unarchive'
}

export const ArchiveButton: React.FC<ArchiveButtonProps> = ({
  calls,
  type,
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const action = async () => {
    const errors = []

    await setIsLoading(true)
    const reqBody = { is_archived: type === 'archive' }

    const patchResponses = await Promise.all(
      calls.map(async (call) => {
        return await patchActivityCall(call.id, reqBody)
      })
    )

    patchResponses.forEach((res) => {
      if (res.status !== 200) errors.push(res)
    })

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
  }

  return (
    <button
      onClick={action}
      disabled={isLoading}
      className="button-text border-[1px]"
    >
      {`${type === 'archive' ? 'Archive' : 'Unarchive'} All Calls`}
    </button>
  )
}
