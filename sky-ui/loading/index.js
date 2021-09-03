import SkLoading from './main'

let LoadingCtor
let vm

function createInstance() {
  vm = new LoadingCtor({
    el: document.createElement('div'),
    propsData: {
      isGlobal: true,
      borderColor: '#1a191e',
    }
  })
}

SkLoading.show = function() {
  if (!vm) {
    createInstance()
  }
  
  vm.visible = true
  vm.$nextTick(() => {
    document.body.appendChild(vm.$el)
  })
}

SkLoading.hide = function() {
  if (vm) {
    vm.visible = false
  }
}

SkLoading.install = function(Vue) {
  LoadingCtor = Vue.extend(SkLoading)
  Vue.component(SkLoading.name, SkLoading)
}

export default SkLoading
