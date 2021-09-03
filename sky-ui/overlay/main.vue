<template>
  <transition name="overlay-fade">
    <div class="sk-overlay" v-show="visible"></div>
  </transition>
</template>

<script>
export default {
  name: 'SkOverlay',

  data () {
    return {
      visible: false,
      isInDocument: false
    }
  },

  methods: {
    show () {
      if (!this.isInDocument) {
        document.body.appendChild(this.$el)
        this.isInDocument = true
      }
      if (!this.visible) {
        this.$nextTick(() => {
          this.visible = true
        })
      }
    },
    hide () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
.sk-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, .6);
}

.overlay-fade-enter-active {
  animation: .3s overlay-fade-in;
}
.overlay-fade-leave-active {
  animation: .3s overlay-fade-out;
}

@keyframes overlay-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes overlay-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
