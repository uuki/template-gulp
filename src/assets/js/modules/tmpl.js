import ViewBase from '../view_base'

export default class Tmpl extends ViewBase {

  constructor (selector) {
    super(selector)
  }

  initialize () {
    console.log('hello, world!')
    super.initialize() // bind
  }

  bind () {
  }
}