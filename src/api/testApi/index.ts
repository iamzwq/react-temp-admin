import { httpClient } from '~/utils/request'

export const testApi = {
  getHotList: () => {
    return httpClient.get('/test')
  },
}
