import { mockRequest } from '@/service'

export function handleMockGetRequest(url: string) {
  return mockRequest.get<any>({ url })
}
