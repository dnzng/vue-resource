<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll" >
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // 滚动步长
  const step = 20

  export default {
    name: 'ScrollBar',
    data () {
      return {
        top: 0
      }
    },
    methods: {
      handleScroll (e) {
        let direction = e.wheelDelta || -e.deltaY
        let $container = this.$refs.scrollContainer
        let $containerHeight = $container.offsetHeight
        let $wrapper = this.$refs.scrollWrapper
        let $wrapperHeight = $wrapper.offsetHeight

        // 向上
        if (direction > 0) {
          this.top = Math.min(0, this.top + step)
        } else {
          // 向下
          if ($containerHeight < $wrapperHeight) {
            if (this.top < -($wrapperHeight - $containerHeight)) {
              this.top = this.top
            } else {
              this.top = Math.max(this.top - step, $containerHeight - $wrapperHeight)
            }
          } else {
            this.top = 0
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .scroll-container {
    width: 100%;
    height: 100%;
    position: relative;
    .scroll-wrapper {
      position: absolute;
      width: 100%!important;
    }
  }
</style>
