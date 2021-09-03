import Vue from 'vue'
import SkOverlay from './main'

const OverlayCtor = Vue.extend(SkOverlay)
const vm = new OverlayCtor({
  el: document.createElement('div')
})

export default vm
