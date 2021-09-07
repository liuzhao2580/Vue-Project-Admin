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
<script>
const appid = 'dingoapbicykzzeqxpelxy'
const url = encodeURIComponent('http://127.0.0.1:9527/login')
export default {
  data() {
    return {}
  },
  computed: {
    iframeSrc() {
      return `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
    }
  },
  created() {},
  mounted() {
    this.ddLoginInit()
  },
  methods: {
    // 钉钉登录方法
    ddLoginInit () {
      const that = this
      document.getElementById('dd-account-iframe').onload = async function () {
        try {
          that.$emit('update:loginLoading', true)
          const getParams = this.contentWindow.location.href
          const getIndex = getParams.indexOf('code=')
          if (getIndex !== -1) {
            const getCode = getParams.split('=')[1].split('&')[0]
            console.log(getCode, 'getCode')
            const { data } = await ddAccountLogin(getCode)
            console.log(data)
            that.$emit('loginSuccess', { ...data })
          }
        } catch (error) {
          console.log(error)
        } finally {
          that.$emit('update:loginLoading', false)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#dd-account-iframe {
  width: 100%;
  height: 400px;
}
</style>
