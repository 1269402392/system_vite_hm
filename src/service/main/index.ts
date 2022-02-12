import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IRequestConfig, IRequestHook } from '@/service/main/type'
import nprogress from 'Nprogress'
import 'nprogress/nprogress.css'
import { cache } from '@/utils/cache'

const DEFAULT_LOADING = true

class LYRequest {
  instance: AxiosInstance
  interceptors?: IRequestHook
  isLoading?: boolean
  constructor(config: IRequestConfig) {
    this.instance = axios.create({ ...config, timeout: 5000 })
    this.interceptors = config.interceptors
    this.isLoading = config.isLoading ?? DEFAULT_LOADING

    this.instance.interceptors.request.use((config) => {
      if (this.isLoading) nprogress.start()
      config.headers!.Authorization = cache.getCache('token')
      return config
    })
    this.instance.interceptors.response.use(
      (res) => {
        if (this.isLoading) nprogress.done()
        return res.data
      },
      (error) => {
        ;(window as any).$message.error('发生错误，服务器启动没有?')
      }
    )

    this.instance.interceptors.request.use(this.interceptors?.requestInterceptors)
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptors)
  }
  private request<T>(config: IRequestConfig): Promise<T> {
    this.isLoading = config.isLoading ?? DEFAULT_LOADING
    this.instance.interceptors.request.use(config.interceptors?.requestInterceptors)
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptors
    )
    return new Promise<any>((resolve, reject) => {
      resolve(this.instance.request<any, T>(config))
    })
  }
  get<T>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  put<T>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}
export default LYRequest
