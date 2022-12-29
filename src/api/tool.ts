import { defHttp } from '@/utils/http/axios'

enum Api {
  REMOVAL_WATERMARK = 'https://tenapi.cn/video'
}

/** 解析视频 */
export const getTargetInfo = (url: string) =>
  defHttp.get(
    { url: '' },
    { isReturnNativeResponse: true, apiUrl: Api.REMOVAL_WATERMARK + '?url=' + url, joinTime: false }
  )
