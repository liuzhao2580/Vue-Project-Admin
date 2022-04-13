<template>
  <div class="dd-account-login">
    <iframe
      :src="iframeSrc"
      frameborder="0"
      id="dd-account-iframe"
      sandbox="allow-scripts allow-same-origin allow-popups"
    ></iframe>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue'
const appid = 'dingoapbicykzzeqxpelxy'
const url = encodeURIComponent('http://127.0.0.1:9527/login')

const iframeSrc = computed((): string => {
  return `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
})

// const emit = defineEmits<{ (e: 'loginSuccess', flag: boolean):void }>()

onMounted(() => {
  ddLoginInit()
})

// 钉钉登录方法
const ddLoginInit = () => {
  // (document.getElementById('dd-account-iframe') as HTMLEl).onload = async () =>{
  //   try {
  //     that.$emit('update:loginLoading', true)
  //     const getParams = contentWindow.location.href
  //     const getIndex = getParams.indexOf('code=')
  //     if (getIndex !== -1) {
  //       const getCode = getParams.split('=')[1].split('&')[0]
  //       console.log(getCode, 'getCode')
  //       const { data } = await ddAccountLogin(getCode)
  //       console.log(data)
  //       that.$emit('loginSuccess', { ...data })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     that.$emit('update:loginLoading', false)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
#dd-account-iframe {
  width: 100%;
  height: 400px;
}
</style>
