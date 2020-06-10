<template>
  <div class="sky-autocomplete__wrapper" :class="getCustomClass">
    <div class="sky-autocomplete__body">
      <input
        type="text"
        :value="value"
        :placeholder="placeholder"
        @input="handleInput($event.target.value.trim())"
        @keydown.up="handleUp"
        @keydown.down="handleDown"
        @keydown.enter="handleEnter"
        @click.stop
        ref="ipt">
      <ul v-if="list.length > 0">
        <li
          v-for="(item, index) in list"
          @click.stop="handleListClick(item)"
          :key="index"
          ref="lies">
          <slot name="item" :item="item" :index="index">
            {{ item.value }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SkyAutocomplete',

    props: {
      // 自定义类名
      customClass: {
        type: String
      },
      // 获取提示数据的逻辑
      fetchSuggestions: {
        type: Function
      },
      // input 事件的回调
      onInput: {
        type: Function
      },
      // 双向数据绑定值
      value: {
        type: String
      },
      placeholder: {
        type: String,
        default: '请输入'
      }
    },
    
    data () {
      return {
        /**
         * 列表数据
         * 元素必须是对象且含有 value 字段，如：
         * [{ name: '北京市', value：'北京' }]
         * 因为，输入框的值，会使用 value 字段
         */
        list: [],
        // 当前下标
        index: -1
      }
    },
    created () {
      this.init()
    },
    destroyed () {
      document.removeEventListener('click', this.hideList)
    },
    computed: {
      getCustomClass () {
        return [this.customClass]
      }
    },
    methods: {
      // 初始化
      init () {
        // 文档任意处点击隐藏下拉列表
        document.addEventListener('click', this.hideList)
      },
      // 隐藏列表
      hideList () {
        this.list = []
      },
      // input 事件
      handleInput (value) {
        // 不为空时才进行查询
        if (value) {
          this.fetchSuggestions(value, list => {
            this.list = list
          })
        } else {
          this.list = []
        }

        // 有数据时，重置样式
        if (this.list.length > 0) {
          this.resetStyle()
        }

        // 重置下标
        this.index = -1
        // 触发双向绑定的 input 事件
        this.$emit('input', value)
        // 触发自定义的 onInput 回调
        if (typeof this.onInput === 'function') {
          this.onInput.call(this.$parent)
        }
      },
      // 列表点击事件
      handleListClick (item) {
        this.$refs.ipt.value = item.value
        this.list = []
        this.index = -1
        // 触发双向绑定的 input 事件
        this.$emit('input', item.value)
        // 触发自定义的 select 事件
        this.$emit('select', item)
      },
      // 向下箭头事件
      handleDown () {
        let len = this.list.length

        if (len === 0) { return }

        if (++this.index >= len) {
          this.index = 0
        }

        this.toIndex()
      },
      // 向上箭头事件
      handleUp () {
        let len = this.list.length

        if (len === 0) return

        if (--this.index === -1) {
          this.index = len - 1
        }

        this.toIndex()
      },
      // 回车
      handleEnter () {
        let len = this.list.length

        if (len === 0) return

        let item = this.list[this.index]

        this.handleListClick(item)
      },
      // 转到第index个项
      toIndex () {
        this.resetStyle()

        this.$refs.lies[this.index].classList.add('on')

        let item = this.list[this.index]
        this.$refs.ipt.value = item.value
        this.$emit('input', item.value)
      },
      // 重置样式
      resetStyle () {
        this.$refs.lies.forEach(el => {
          el.classList.remove('on')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sky-autocomplete__wrapper {
    background-color: #fff;
  }

  .sky-autocomplete__wrapper .sky-autocomplete__body {
    position: relative;
    input {
      display: block;
      width: 100%;
      height: 40px;
      line-height: 1;
      padding: 0 10px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      &:focus {
        border-color: #409eff;
      }
      &::placeholder {
        opacity: 0.5;
      }
      &::-webkit-input-placeholder {
        opacity: 0.5;
      }
      &::-moz-placeholder {
        opacity: 0.5;
      }
      &::-ms-input-placeholder {
        opacity: 0.5;
      }
    }
    ul {
      width: 100%;
      border: 1px solid #eee;
      border-top: none;
      position: absolute;
      top: 100%;
      z-index: 99;
      li {
        height: 30px;
        line-height: 30px;
        padding-left: 11px;
        background-color: #fff;
        color: #000;
        cursor: pointer;
        &:hover, &.on {
          background-color: #eee;
          color: #999;
        }
      }
    }
  }
</style>
