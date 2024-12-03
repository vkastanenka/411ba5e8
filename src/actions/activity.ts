// utils
import { serverRequestServer } from '@/lib/server'

// types
import { ActivityCall, ActivityCallRequestBody } from '@/types/activity'

// constants
import { ACTIVITIES } from '@/constants/server-endpoints'

export const getActivityCalls = async () => {
  return await serverRequestServer<ActivityCall[]>({
    endpoint: ACTIVITIES,
    method: 'get',
  })
}

export const getActivityCall = async (recordId: string) => {
  return await serverRequestServer<ActivityCall>({
    endpoint: `${ACTIVITIES}/${recordId}`,
    method: 'get',
  })
}

export const patchActivityCall = async (
  recordId: string,
  reqBody: ActivityCallRequestBody
) => {
  return await serverRequestServer<unknown, ActivityCallRequestBody>({
    data: reqBody,
    endpoint: `${ACTIVITIES}/${recordId}`,
    method: 'patch',
  })
}

export const patchActivityCalls = async () => {
  return await serverRequestServer({
    endpoint: ACTIVITIES,
    method: 'patch',
  })
}
