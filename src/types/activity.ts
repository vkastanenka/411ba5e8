export interface ActivityCall {
  direction: string
  from: number
  to: number
  via: number
  duration: number
  is_archived: boolean
  call_type: string
  id: string
  created_at: string
}

export interface ActivityCallRequestBody {
  is_archived: boolean
}
