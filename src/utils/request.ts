import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'
import { useUserInfoStore } from '~/stores'

// 扩展axios接口
declare module 'axios' {
  interface AxiosRequestConfig {
    successCode?: number
  }
}

interface ApiResult<T = any> {
  code: number
  data: T
  message: string
}

const SUCCESS_CODE = 1000

class Request {
  private instance: AxiosInstance
  // 存放取消请求控制器Map
  private abortControllerMap: Map<string, AbortController>

  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config)

    this.abortControllerMap = new Map()

    // 请求拦截器
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (config.url !== '/login') {
        const token = useUserInfoStore.getState().userInfo?.token
        if (token) config.headers['x-token'] = token
      }

      const controller = new AbortController()
      const url = config.url || ''
      config.signal = controller.signal
      this.abortControllerMap.set(url, controller)

      return config
    }, Promise.reject)

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const url = response.config.url || ''
        this.abortControllerMap.delete(url)

        const successCode = response.config.successCode || SUCCESS_CODE
        if (response.data.code !== successCode) {
          return Promise.reject(response.data)
        }

        return response.data
      },
      (err) => {
        if (err.response?.status === 401) {
          useUserInfoStore.setState({ userInfo: null })
          window.location.href = `/login?redirect=${window.location.pathname}`
        }

        return Promise.reject(err)
      }
    )
  }

  // 取消全部请求
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort()
    }
    this.abortControllerMap.clear()
  }

  // 取消指定的请求
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort()
      this.abortControllerMap.delete(_url)
    }
  }

  request<T = any>(config: AxiosRequestConfig): Promise<ApiResult<T>> {
    return this.instance.request(config)
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return this.instance.get(url, config)
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return this.instance.post(url, data, config)
  }
}

export const httpClient = new Request({
  timeout: 20 * 1000,
  baseURL: import.meta.env.VITE_API_URL,
})
