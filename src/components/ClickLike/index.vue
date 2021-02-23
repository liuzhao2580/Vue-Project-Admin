<template>
    <div class="ClickLike-box" @click="ClickLike">
        <img :src="src" alt="" />
        {{ dz_Name }}
        <div class="animate" v-show="ClickLike_Status"></div>
    </div>
</template>

<script>
export default {
  name: 'ClickLike',
  components: {},
  data() {
    return {
      // 设置 缓缓升起的红心的显示状态
      ClickLike_Status: false,
      scr: '',
      dz_Name: '赞',
      // 点赞前的图片
      src_dz: require('@/assets/images/dz.png'),
      dzd_status: false, // 点赞状态, 如果没有点赞 false  点赞之后就是 true
      // 点赞后的图片
      src_dzd: require('@/assets/images/dzd.png')
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.src = this.src_dz
    },
    ClickLike() {
      // 说明已经点赞了, 如果再次点击 就是取消点赞
      if (this.dzd_status) {
        this.dz_Name = '赞'
        this.src = this.src_dz
        this.dzd_status = false
        return
      }
      this.ClickLike_Status = true
      setTimeout(() => {
        this.ClickLike_Status = false
        this.src = this.src_dzd
        this.dzd_status = true
      }, 1000)
    }
  },
  watch: {
    // 通过监听 点赞状态 改变 显示的字体
    dzd_status(val) {
      if (val) {
        this.dz_Name = '取消'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ClickLike-box {
    position: relative;
    img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
    .animate {
        position: absolute;
        width: 20px;
        height: 20px;
        z-index: 100;
        animation: ClickLikeAni 1s ease-in-out;
        background-image: url('../../assets/images/dzd.png');
        background-size: cover;
    }
}
@keyframes ClickLikeAni {
    0% {
        top: 0px;
    }
    10% {
        top: -3px;
    }
    20% {
        top: -6px;
    }
    30% {
        top: -9px;
    }
    40% {
        top: -12px;
        transform: rotate(6deg);
    }
    50% {
        top: -15px;
        transform: rotate(12deg);
    }
    60% {
        top: -18px;
        transform: rotate(6deg);
    }
    70% {
        top: -21px;
        transform: rotate(0deg);
    }
    80% {
        top: -24px;
        transform: rotate(-6deg);
    }
    90% {
        top: -27px;
        transform: rotate(-12deg);
    }
    100% {
        top: -30px;
        transform: rotate(-6deg);
    }
}
</style>
