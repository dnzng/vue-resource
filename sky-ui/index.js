import SkNav from './nav'
import SkButton from './button'
import SkInput from './input'
import SkLoading from './loading'
import SkForm from './form'
import SkFormItem from './form-item'
import SkConfirm from './confirm'
import SkDrawer from './drawer'
import SkScrollbar from './scrollbar'
import SkAutocomplete from './autocomplete'

export {
  SkNav,
  SkButton,
  SkInput,
  SkLoading,
  SkForm,
  SkFormItem,
  SkConfirm,
  SkDrawer,
  SkScrollbar,
  SkAutocomplete,
}

export default function(Vue) {
  [
    SkNav,
    SkButton,
    SkInput,
    SkLoading,
    SkForm,
    SkFormItem,
    SkConfirm,
    SkDrawer,
    SkScrollbar,
    SkAutocomplete,
  ].forEach(component => {
    Vue.use(component)
  })
}
