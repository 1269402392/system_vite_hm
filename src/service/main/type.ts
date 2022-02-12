import { AxiosRequestConfig } from 'axios'

export interface IRequestHook<T = any> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  responseInterceptors?: (res: T) => T
}

export interface IRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: IRequestHook<T>
  isLoading?: boolean
}
