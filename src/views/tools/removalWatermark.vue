<template>
  <div class="flex justify-center h-full w-full pt-10">
    <div class="w-full pl-2 pr-2 lg:w-7/10">
      <div class="mt-2">
        <span class="font-black">支持</span>
        抖音/皮皮虾/火山/微视/微博/绿洲/最右/轻视频/instagram/哔哩哔哩/快手/全民小视频/皮皮搞笑/全民k歌/巴塞电影/陌陌/Before避风/开眼/Vue
        Vlog/小咖秀/西瓜视频/逗拍/虎牙/6间房/新片场/Acfun/美拍
      </div>
      <div class="mt-2">
        <span class="font-black">温馨提示</span>
        粘贴视频地址时无需删除文案 但如果视频链接正确但解析失败请删掉文案后重试
      </div>
      <NInputGroup class="mt-8">
        <NInput
          v-model:value="inputValue"
          clearable
          :style="{ width: '90%' }"
          placeholder="请粘贴分享链接"
        />
        <NButton @click="analysis">解析</NButton>
      </NInputGroup>
      <div v-if="videoInfo" class="mt-5 flex flex-row justify-center space-x-4">
        <NButton v-if="videoInfo.url" @click="startDownloading(videoInfo?.url as string)"
          >下载视频</NButton
        >
        <NButton v-if="videoInfo.music" @click="startDownloading(videoInfo?.music as string)">
          下载音乐
        </NButton>
        <NButton v-if="videoInfo.music" @click="startDownloading(videoInfo?.cover as string)">
          下载封面
        </NButton>
        <NButton v-if="videoInfo.title" @click="copyTitle()">复制文案</NButton>
      </div>

      <div v-if="videoInfo" class="text-center mt-2">有些平台视频需要点击视频右下角进行下载</div>
      <video
        id="RemovalWatermarkVideo"
        v-if="videoUrl"
        controls
        class="m-auto mt-5"
        :src="videoUrl"
      >
      </video>
    </div>
  </div>
</template>
<script lang="ts" setup name="RemovalWatermark">
  import { NInputGroup, NInput, NButton, useMessage, MessageReactive } from 'naive-ui'
  import { useClipboard } from '@vueuse/core'

  import { download, download_jump } from '@/utils/index'

  const message = useMessage()

  const inputValue = ref<string>('')

  const videoUrl = ref<string>()

  /** 视频信息 */
  type VideoInfo = {
    /**视频url */
    url: string
    /** 音乐url */
    music: string
    /** 标题 */
    title: string
    /** 封面url */
    cover: string
  }
  /** 视频信息 */
  const videoInfo = ref<VideoInfo>()

  const messageReactive = ref<MessageReactive>()

  const analysis = () => {
    if (!!!inputValue.value) {
      message.error('没有内容')
      return
    }
    messageReactive.value = message.loading('开始解析', {
      duration: 0
    })
    const reg = /http[s]?:\/\/[\w.]+[\w/]*[\w.]*\??[\w=&:\-+#/%]*[/]*/
    var t = reg.exec(inputValue.value + '')
    var url = encodeURIComponent(t as unknown as string)
    axios
      .get('https://tenapi.cn/video' + '?url=' + url)
      .then((res) => {
        if (!res.data.url) {
          console.log('解析失败')
          messageReactive.value?.destroy()
          message.error('解析失败')
          return
        }

        if (res.data.url.indexOf('https') === -1) {
          res.data.url = res.data.url.replaceAll('http', 'https')
        }
        videoUrl.value = res.data.url
        videoInfo.value = res.data

        message.success('解析成功')
      })
      .catch(() => {
        message.error('解析失败')
      })
      .finally(() => {
        messageReactive.value?.destroy()
      })
  }

  /**开始下载 */
  const startDownloading = (url: string) => {
    messageReactive.value = message.loading('开始下载', {
      duration: 0
    })
    download(url)
      .then(() => {
        message.success('下载成功')
      })
      .catch(() => {
        download_jump(url)
      })
      .finally(() => {
        messageReactive.value?.destroy()
      })
  }

  const { copy } = useClipboard()
  const copyTitle = () => {
    console.log()
    copy(videoInfo.value?.title as string)
    message.success('已复制到剪切板')
  }
</script>
<style lang="less" scoped></style>
