<template>
  <form class="sk-form" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'SkForm',
}
</script>
