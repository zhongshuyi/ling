import { defHttp } from '@/utils/http/axios'

enum Api {
  K_B_TOP_NAME = '/blog/blogKnowledgeBase/topNameList'
}

/** 获取知识库列表名称 */
export const getKBTopName = () => defHttp.get({ url: Api.K_B_TOP_NAME })
