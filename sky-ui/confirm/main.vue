<template>
  <transition 
    name="confirm-fade"
    @beforeEnter="beforeEnter"
    @beforeLeave="beforeLeave"
  >
    <div class="sk-confirm__wrapper" v-show="visible">
      <div class="sk-confirm">
        <div class="sk-confirm__content">
          <div class="sk-confirm__title" v-if="title">
            {{ title }}
          </div>
          <div class="sk-confirm__message" v-if="message">
            {{ message }}
          </div>
        </div>
        <div class="sk-confirm__footer">
          <button @click="onCancel">
            {{ cancelButtonText || '取消'}}
          </button>
          <button @click="onConfirm">
            {{ confirmButtonText || '确认' }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Overlay from '../overlay'

export default {
  name: 'SkConfirm',

  props: {
    title: String,
    message: String,
    confirmButtonText: String,
    cancelButtonText: String,
  },

  data() {
    return {
      visible: false,
      action: ''
    }
  },

  methods: {
    close() {
      this.visible = false
      this.$nextTick(() => {
        if (this.action) this.callback(this.action)
      })
    },
    onConfirm() {
      this.action = 'confirm'
      this.close()
    },
    onCancel() {
      this.action = 'cancel'
      this.close()
    },
    beforeEnter() {
      Overlay.show()
    },
    beforeLeave() {
      Overlay.hide()
    },
  }
}
</script>

<style lang="scss">
.sk-confirm__wrapper {
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  &::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
}

.sk-confirm {
  display: inline-block;
  width: 5.5rem;
  background-color: #fff;
  vertical-align: middle;
  &__content {
    padding: .6rem 0;
    font-size: .28rem;
    color: #666;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  &__title {
    margin-top: -0.1rem;
    margin-bottom: .2rem;
    font-family: "PingFangSC-Medium";
    font-size: .3rem;
    color: #1C1717;
  }
  &__message {
    font-family: "PingFangSC-Light";
  }
  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 2.74rem;
      height: .9rem;
      line-height: .9rem;
      background-color: #fff;
      font-size: .3rem;
      color: #1C1717;
      text-align: center;
      border: none;
      &:nth-child(1) {
        font-family: "PingFangSC-Light";
        border-right: 1px solid #ccc;
      }
      &:nth-child(2) {
        font-family: "PingFangSC-Medium";
      }
    }
  }
}


.confirm-fade-enter-active {
  animation: .25s confirm-fade-in;
}

.confirm-fade-leave-active {
  animation: .25s confirm-fade-out;
}

@keyframes confirm-fade-in {
  0% {
    transform: scale3d(.6, .6, .6);
    opacity: 0;
  }
  80% {
    transform: scale3d(1.03, 1.03, 1.03);
  }
  100% {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
}

@keyframes confirm-fade-out {
  0% {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
  100% {
    transform: scale3d(.6, .6, .6);
    opacity: 0;
  }
}
</style>
