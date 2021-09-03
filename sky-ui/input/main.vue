<template>
  <div class="sk-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :value="value"
      @compositionstart="onCompositionStart"
      @compositionupdate="onCompositionUpdate"
      @compositionend="onCompositionEnd"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    >
    <i
      v-show="showClear"
      class="sk-input__clearbtn"
      @mousedown.prevent
      @click="onClear"
      @touchstart.stop="onClear">
    </i>
  </div>
</template>

<script>
export default {
  name: 'SkInput',
  
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    placeholder: String,
    maxlength: [String, Number],
  },
  data() {
    return {
      isComposing: false,
      showClear: false
    }
  },
  methods: {
    onCompositionStart() {
      this.isComposing = true
    },
    onCompositionUpdate() {
      this.isComposing = true
    },
    onCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false
        this.onInput(event)
      }
    },
    onInput(event) {
      // 针对输入法
      if (this.isComposing) return

      const value = event.target.value
      this.showClear = !!value
      this.$emit('input', value)
    },
    onFocus(event) {
      this.showClear = !!event.target.value
      this.$emit('focus', event)
    },
    onBlur(event) {
      this.showClear = false
      this.$emit('blur', event)
    },
    onClear() {
      this.showClear = false
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss">
.sk-input {
  position: relative;

  input {
    width: 100%;
    height: .9rem;
    padding: .25rem .24rem;
    background-color: #F5F5F5;
    border: none;
    border-radius: 0;
    font-size: .28rem;
    &::-webkit-input-placeholder {
      font-family: "PingFangSC-Regular";
      font-size: inherit;
    }
  }

  &__clearbtn {
    width: .3rem;
    height: .3rem;
    background-image: url("~@/assets/images/icon-close.svg");
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    right: .15rem;
    transform: translate(0, -50%);
    cursor: pointer;
  }
}
</style>
