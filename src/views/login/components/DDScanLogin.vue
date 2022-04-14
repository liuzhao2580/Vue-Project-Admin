<template>
  <div class="dd-scan-login">
    <div id="dd-login"></div>
  </div>
</template>

<script lang="ts" setup>
/** 钉钉扫码登录 */
const appid = 'dingoapbicykzzeqxpelxy'
const url = encodeURIComponent('http://127.0.0.1:9527/login')
const goto = encodeURIComponent(
  `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
)



onMounted(() => {
  ddInit()
  window.addEventListener('message', DDMessage, false)
})

/** 初始化钉钉登录 */
const ddInit = () => {
  window.DDLogin({
    id: 'dd-login',
    goto, // 请参考注释里的方式
    style: 'border:none;background-color:#FFFFFF;',
    width: '365',
    height: '400'
  })
}
/** 钉钉登录 */
const DDMessage = (event : { origin: string, data: string}) => {
  const origin = event.origin
  if (origin === 'https://login.dingtalk.com') {
    // 判断是否来自ddLogin扫码事件。
    const loginTmpCode = event.data
    // 获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
    console.log('loginTmpCode', loginTmpCode)
  }
}
onUnmounted(() => {
  window.removeEventListener('message', DDMessage, false)
})
</script>

<script lang="ts">
import { onMounted, onUnmounted } from 'vue'

export default {
  name: 'DDScanLogin'
}
</script>

<style lang="scss" scoped></style>
