import SkConfirm from './main'

const defaultOptions = {
  title: '',
  message: '',
  confirmButtonText: '',
  cancelButtonText: '',
}

let ConfirmCtor
let vm

function createInstance() {
  vm = new ConfirmCtor({
    el: document.createElement('div')
  })
}

function init(options = {}) {
  if (!vm) {
    createInstance()
  }

  vm.action = ''
  options = Object.assign({}, defaultOptions, options)
  
  for (const prop in options) {
    if (options.hasOwnProperty(prop)) {
      vm[prop] = options[prop]
    }
  }

  return new Promise((resolve, reject) => {
    vm.callback = action => {
      if (action === 'confirm') {
        resolve(action)
      } else if (action === 'cancel') {
        reject(action)
      }
    }
    document.body.appendChild(vm.$el)
    vm.visible = true
  })
}

SkConfirm.install = function(Vue) {
  ConfirmCtor = Vue.extend(SkConfirm)
  Vue.component(SkConfirm.name, SkConfirm)
  Vue.prototype.$confirm = init
}

export default SkConfirm
