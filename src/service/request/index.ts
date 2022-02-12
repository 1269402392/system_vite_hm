import { lyRequest } from '@/service'
import { IDataType } from '@/service/type'

export function handlePostRequest(url: string, data?: any) {
  return lyRequest.post<IDataType>({ url, data })
}
export function handleGetRequest(url: string, data?: any) {
  return lyRequest.get<IDataType>({ url, params: data })
}
export function handleDeleteRequest(url: string, data?: any) {
  return lyRequest.delete<IDataType>({ url, data })
}
export function handlePutRequest(url: string, data?: any) {
  return lyRequest.put<IDataType>({ url, data })
}
// 无Loading请求
export function loginRequest(url: string, data?: any) {
  return lyRequest.post<IDataType>({ url, data, isLoading: false })
}
export function handleGetNoLoading(url: string, data?: any) {
  return lyRequest.get<IDataType>({ url, data, isLoading: false })
}
