<template>
  <button 
    :class="[
      'sk-button',
      { 
        'sk-button--disabled': disabled 
      }
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
import SkLoading from '../loading'

export default {
  name: 'SkButton',

  components: {
    SkLoading,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  
  methods: {
    onClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss">
.sk-button {
  display: inline-block;
  width: 100%;
  height: .9rem;
  line-height: .9rem;
  background-color: #1C1717;
  color: #fff;
  border: none;
  font-family: "PingFangSC-Medium";
  font-size: .3rem;
  &--disabled {
    background-color: #ccc;
  }
}
</style>
