<template>
  <!-- 为了曝光，使用 v-show -->
  <nav class="sk-nav-wrapper" :style="wrapperStyle" v-show="navVisible">
    <div class="sk-nav" :style="navStyle">
      <span class="sk-nav__back" @click="back"></span>
      <p class="sk-nav__title">{{ title }}</p>
      <span class="sk-nav__del" v-if="canDelete" @click="del">删除</span>
    </div>
  </nav>
</template>

<script>
import { goBack, isNotchScreen } from '@/utils/util'

const NAV_HEIGHT = 0.88 // 导航高度
const STATUS_HEIGHT = 0.44 // 状态栏高度
const NOTCH_HEIGHT = 0.88 // 刘海屏高度

export default {
  name: 'SkNav',

  props: {
    title: String,
    canDelete: Boolean,
    beforeBack: Function
  },
  computed: {
    // 只有 m 站用 h5 的头，APP 和 小程序用原生的头
    navVisible () {
      const device = app.deviceType
      return !(device.inApp || device.inProgram || device.weixin)
    },
    // 是否刘海屏
    isNotch () {
      return isNotchScreen()
    },
    wrapperStyle ({ isNotch }) {
      const deviceType = app.deviceType
      return deviceType.inApp
        ? isNotch
          ? { height: NAV_HEIGHT + NOTCH_HEIGHT + 'rem', }
          : { height: NAV_HEIGHT + STATUS_HEIGHT + 'rem' }
        : {}
    },
    navStyle ({ isNotch }) {
      const deviceType = app.deviceType
      return deviceType.inApp
        ? isNotch
          ? {
            height: NAV_HEIGHT + NOTCH_HEIGHT + 'rem',
            paddingTop: NOTCH_HEIGHT + 'rem',
          }
          : {
            height: NAV_HEIGHT + STATUS_HEIGHT + 'rem',
            paddingTop: STATUS_HEIGHT + 'rem',
          }
        : {}
    },
  },
  created () {
    // 使用 APP 的头. h5 的头在 ios中如果有 input，
    // 点击后，头部固定定位会失效并上移
    const deviceType = app.deviceType
    if (deviceType.inApp) {
      app.regBridge('onClearanceBack', this.back)
      app.regBridge('onClearanceDelete', this.del)
      app.callBridge('updateUI', [
        {
          viewId: 'leftTopItemFirst',
          imageResId: 'img_back',
          onClick: 'onClearanceBack'
        },
        ...(this.canDelete
          ? [{
            viewId: 'rightTopItemFirst',
            text: '删除',
            onClick: 'onClearanceDelete'
          }]
          : []
        )
      ])
    }
  },
  methods: {
    back () {
      this.blur()
      const next = () => goBack()
      const { beforeBack } = this
      if (beforeBack && typeof beforeBack === 'function') {
        beforeBack(next)
      } else {
        next()
      }
    },
    del () {
      this.blur()
      this.$emit('delete')
    },
    blur () {
      // APP 的头不会失焦，需要主动调用
      document.activeElement.blur && document.activeElement.blur()
    }
  }
}
</script>

<style lang="scss">
$--nav-height: .88rem;

// 占位用的
.sk-nav-wrapper {
  height: $--nav-height;
}

.sk-nav {
  height: $--nav-height;
  line-height: $--nav-height;
  padding: 0 .3rem;
  font-family: "PingFangSC-Medium";
  color: #1C1717;
  text-align: center;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  &__back::before {
    content: "\e655";
    font-size: .46rem;
    font-family: "header_iconfont";
    position: absolute;
    left: .3rem;
    bottom: $--nav-height / 2;
    transform: translateY(50%);
  }
  &__title {
    font-size: .34rem;
  }
  &__del {
    font-size: .3rem;
    position: absolute;
    right: .3rem;
    bottom: $--nav-height / 2;
    transform: translateY(50%)
  }
}
</style>
