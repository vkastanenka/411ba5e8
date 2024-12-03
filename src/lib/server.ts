// utils
import axios from 'axios'

// types
import { AxiosError, AxiosResponse } from 'axios'
import { ErrRes, HttpStatusCode } from '@/types'

// Object for providing meaningful errors
export const appError = ({
  message,
  statusCode,
}: {
  message: string
  statusCode: HttpStatusCode
}): ErrRes => ({
  data: undefined,
  message,
  status: 'error',
  statusCode,
  success: false,
})

// Formats error received from the server
export const formatServerError = (err: unknown): ErrRes => {
  const error = err as AxiosError

  // Return axios error if data
  if (error?.response?.data) {
    return error.response.data as ErrRes
  }

  // Return default async error if axios troubles
  return appError({
    message: 'Internal server error!',
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  })
}

export const serverRequestServer = async <
  T = object | undefined,
  S = object | undefined
>({
  data,
  method,
  endpoint,
}: {
  data?: S
  method: 'get' | 'post' | 'patch' | 'delete'
  endpoint: string
}) => {
  try {
    const res = await axios({
      data,
      method,
      url: `${process.env.NEXT_AIRCALL_API_URL}${endpoint}`,
    })
    return res as AxiosResponse<T>
  } catch (err) {
    return formatServerError(err)
  }
}
