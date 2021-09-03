<template>
  <div class="sk-scrollbar__wrapper" ref="scrollbarWrapper" @wheel.prevent="onScroll" >
    <div class="sk-scrollerbar" ref="scrollbar" :style="{ top: top + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // 内容底部留白高度
  const blankHeight = 15

  export default {
    name: 'SkyScrollBar',

    data () {
      return {
        top: 0
      }
    },
    methods: {
      onScroll(e) {
        // wheelDelta: 非标准属性; deltaY: DOM3 标准属性
        // https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel
        const eventDelta = e.wheelDelta || -e.deltaY * 3
        const $wrapper = this.$refs.scrollbarWrapper
        const $containerHeight = $wrapper.offsetHeight
        const $scrollbar = this.$refs.scrollbar
        const $wrapperHeight = $scrollbar.offsetHeight + blankHeight

        if (eventDelta > 0) { 
          // 向上滚动
          this.top = Math.min(0, this.top + eventDelta)
        } else if ($wrapperHeight > $containerHeight) { 
          // 只在 内容高度 + 留白高度 > 外部容器高度 时，才会向下滚动
          if (this.top < $containerHeight - $wrapperHeight) {
            this.top = this.top
          } else {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight)
          }
        } else { 
          // 内容高度 < 外部容器高度，top = 0
          this.top = 0
        }
      }
    }
  }
</script>

<style lang="scss">
  .sk-scrollbar__wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    .sk-scrollerbar {
      position: absolute;
      width: 100%!important;
    }
  }
</style>
