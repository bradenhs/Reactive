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

document.addEventListener('deviceready', () => {
  if (device.platform === 'iOS') {
    (cordova.plugins as any).Keyboard.disableScroll(true)
    setIOSPaddingWhenReady()
  }
}, false)

function setIOSPaddingWhenReady() {
  if (app == undefined) {
    setTimeout(setIOSPaddingWhenReady, 50)
  } else {
    app.setTopPadding(20)
  }
}

export async function init() {
  styles.addBaseStyles()
  styles.addFonts()

  ReactDOM.render(<view.App/>, document.querySelector('#app'))

  const result = await promise

  if (result != undefined) {
    const topPadding = app.topPadding
    try {
      app.fromObject(result)
    } catch (e) {
      alert(
        'Invalid version of app state on disk. ' +
        'Clear app storage to fix this (simply reinstalling works).'
      )
    }
    app.setTopPadding(topPadding)
  }
  app.finishLoading()

  setTimeout(() => {
    document.querySelector('#loader').className = 'remove'
    setTimeout(() => {
      document.querySelector('#loader').remove()
    }, 500)
  }, 500)

  reaction(() => {
    localforage.setItem('app', app.toString())
  })
}

window.addEventListener('native.keyboardshow', () => {
  if (document.activeElement != undefined &&
      (document.activeElement.tagName.toLowerCase() === 'input' ||
       document.activeElement.tagName.toLowerCase() === 'textarea')) {
    let node = document.activeElement.parentElement
    while (!node.classList.contains('input-scoll-container')) {
      node = node.parentElement
    }
    setTimeout(() => {
      node.children[0].scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }
})
