<template>
  <transition
    name="drawer"
    @beforeEnter="beforeEnter"
    @beforeLeave="beforeLeave"
  >
    <div class="sk-drawer-wrapper" v-show="visible" @click="close">
      <div class="sk-drawer" @click.stop>
        <div class="sk-drawer__header" v-if="title">
          <div class="sk-drawer__title">
            {{ title }}
          </div>
          <i class="sk-drawer__headerbtn" @click="close"></i>
        </div>
        <div class="sk-drawer__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Overlay from '../overlay'

export default {
  name: 'SkDrawer',

  model: {
    prop: 'visible',
    event: 'change'
  },

  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close() {
      this.$emit('change', false)
    },
    beforeEnter() {
      Overlay.show()
    },
    beforeLeave() {
      Overlay.hide()
    }
  }
}
</script>

<style lang="scss">
.sk-drawer-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
}

.sk-drawer {
  padding: 0 .3rem;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  &__header {
    height: 1.1rem;
    line-height: .48rem;
    padding: 0.31rem 0;
    position: relative;
  }
  &__title {
    font-family: "PingFangSC-Medium";
    font-size: .34rem;
    color: #1A191E;
    letter-spacing: 0;
  }
  &__headerbtn {
    width: .28rem;
    height: .28rem;
    background-image: url(~@/assets/images/icon-close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
}

.drawer-enter-active {
  animation: .3s btt-drawer-in;
}
.drawer-leave-active {
  animation: .3s btt-drawer-out;
}

@keyframes btt-drawer-in {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes btt-drawer-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, 100%, 0);
  }
}
</style>
