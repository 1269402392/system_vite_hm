import { echarsRequest } from '@/service'

export function handleEcharsGetRequest(url: string, data?: any) {
  return echarsRequest.get<any>({ url, data })
}
