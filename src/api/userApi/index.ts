import { httpClient } from '~/utils/request'
import { LoginParams, UserInfo } from './types'

export const userApi = {
  login: (params: LoginParams) => {
    return httpClient.post<UserInfo>('/login', params)
  },
}
