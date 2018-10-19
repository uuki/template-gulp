export default class {
  constructor (el, args = {}) {
    this.el = document.querySelectorAll(el)

    if(args && args instanceof Object && Object.keys(args).length) {
      for(let key of Object.keys(args)) {
        this[key] = args[key]
      }
    }

    if(this.el[0]) {
      this.initialize();
    }
  }

  initialize () {
    this.bind();
  }

  bind () {}

  unbind () {
    this.unbind()
  }
}