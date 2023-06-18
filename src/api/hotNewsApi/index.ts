import useSWR from 'swr'
import { httpClient } from '~/utils/request'
import { NewItem } from './types'

export const useFetchHotNews = (type: string) => {
  const { data, isValidating } = useSWR(`/new?type=${type}`, (url) =>
    httpClient.get<{ list: NewItem[] }>(url, {
      successCode: 200,
    })
  )

  return {
    hotNews: data?.data.list,
    isValidating,
  }
}
