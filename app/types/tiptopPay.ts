export interface TiptopWidgetConfigResponse {
  success: boolean
  widget_url: string
  config: Record<string, unknown>
}

export interface TiptopPaymentStatusData {
  status?: string | null
  reason?: string | null
  message?: string | null
}

export interface TiptopPaymentStatusResponse {
  success: boolean
  paid: 'yes' | 'no' | string
  payment?: TiptopPaymentStatusData | null
  reason?: string | null
  message?: string | null
}

