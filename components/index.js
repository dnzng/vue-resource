import Autocomplete from './autocomplete'
import ScrollBar from './scrollbar'

const components = {
  Autocomplete,
  ScrollBar,
}

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  Autocomplete,
  scrollbar,
}
