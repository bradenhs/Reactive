import { reaction } from 'fnx'
import * as localforage from 'localforage'
import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as smoothscroll from 'smoothscroll-polyfill'
import { app, styles, view } from '~/index'

(window as any).localforage = localforage

smoothscroll.polyfill()

injectTapEventPlugin()

const promise = localforage.getItem('app')

export async function init() {
  styles.addBaseStyles()
  styles.addFonts()

  ReactDOM.render(<view.App/>, document.querySelector('#app'))

  const result = await promise

  if (result != undefined) {
    app.fromObject(result)
  }
  app.finishLoading()

  setTimeout(() => {
    document.querySelector('#loader').className = 'remove'
    setTimeout(() => {
      document.querySelector('#loader').remove()
    }, 500)
  }, 500)

  if (ENVIRONMENT === 'mobile-app') {
    document.addEventListener('deviceready', () => {
      if (device.platform === 'iOS') {
        app.setTopPadding(20)
      }
    }, false)
  }

  reaction(() => {
    localforage.setItem('app', app.toString())
  })
}

window.addEventListener('resize', () => {
  if (document.activeElement != undefined &&
      (document.activeElement.tagName.toLowerCase() === 'input' ||
       document.activeElement.tagName.toLowerCase() === 'textarea')) {
    let parent = document.activeElement.parentElement
    while (!parent.classList.contains('input-scoll-container')) {
      parent = parent.parentElement
    }
    parent.scrollIntoView({ behavior: 'smooth' })
  }
})
