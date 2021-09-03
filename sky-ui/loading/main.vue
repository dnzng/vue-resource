<template>
  <div 
    v-show="visible"
    :class="[
      'sk-loading',
      {
        'sk-loading--global': isGlobal
      }
    ]" 
  >
    <span class="sk-loading__spinner" :style="style"></span>
  </div>
</template>

<script>
export default {
  name: 'SkLoading',

  props: {
    width: [Number, String],
    height: [Number, String],
    borderColor: String,
    // 是否全局显示
    isGlobal: {
      type: Boolean,
      defalut: false
    }
  },

  data () {
    return {
      visible: !this.isGlobal
    }
  },
  computed: {
    style ({ width, height, borderColor }) {
      width = width ? parseFloat(width) + 'rem' : ''
      height = height ? parseFloat(height) + 'rem' : ''

      return {
        width,
        height, 
        borderColor,
      }
    }
  },
}
</script>

<style lang="scss">
.sk-loading {
  display: inline-block;
  position: relative;
  font-size: 0;
  vertical-align: middle;

  &--global {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 1000;
    transform: translate3d(-50%, -50%, 0);
  }

  &__spinner {
    display: inline-block;
    width: .4rem;
    height: .4rem;
    border: .04rem solid #fff;
    border-right-color: transparent!important;
    border-radius: 50%;
    vertical-align: middle;
    animation-name: loading-rotate;
    animation-duration: .7s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}

@keyframes loading-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
