export interface ShortServiceOrder {
  id: string
  title: string
}

export interface ServiceOrder {
  id: string
  title: string
  description: string
  imageFiles: string[]
  serviceTypeId?: number
  options?: ServiceOrderOptions
}

export interface ServiceOrderOptions {
  version: number
  options: { title: string; selected: boolean }[]
}
