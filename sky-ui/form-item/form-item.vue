<template>
  <div 
    :class="[
      'sk-form-item',
      { 'is-required': required },
    ]"
  >
    <div 
      v-if="label" 
      class="sk-form-item__label"
    >
      <slot name="label">
        <label>{{ label }}</label>
      </slot>
    </div>
    <div class="sk-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkFormItem',

  props: {
    label: String,
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.is-required {
  .sk-form-item__label label::after {
    content: "※";
    margin-left: .08rem;
    font-size: .18rem;
    color: #F8A120;
    vertical-align: top;
  }
}

.sk-form-item {
  margin-bottom: .4rem;
  &__label {
    display: block;
    margin-bottom: .2rem;
    line-height: .42rem;
    font-family: "PingFangSC-Medium";
    font-size: .3rem;
    color: #1C1717;
  }
}
</style>
