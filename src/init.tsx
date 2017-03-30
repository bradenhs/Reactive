import { reaction } from 'fnx'
import * as localforage from 'localforage'
import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { app, styles, view } from '~/index'

(window as any).localforage = localforage

const promise = localforage.getItem('app')

export async function init() {
  styles.addBaseStyles()
  styles.addFonts()

  injectTapEventPlugin()

  ReactDOM.render(<view.App/>, document.querySelector('#app'))

  const result = await promise

  if (result != undefined) {
    app.fromObject(result)
  }

  app.finishLoading()

  if (ENVIRONMENT === 'mobile-app') {
    document.addEventListener('deviceready', () => {
      if (device.platform === 'iOS') {
        app.setTopPadding(20)
        Keyboard.shrinkView(true)
        Keyboard.hideFormAccessoryBar(true)
      } else {
        if (window.innerHeight <= 320 && window.innerWidth <= 240) {
          app.setTopPadding(20)
        } else if (window.innerHeight <= 480 && window.innerWidth <= 320) {
          app.setTopPadding(25)
        } else {
          app.setTopPadding(38)
        }
      }

      navigator.splashscreen.hide()

      // Initialize status bar
      StatusBar.styleBlackOpaque()
      StatusBar.show()
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
    if (document.activeElement.getBoundingClientRect().bottom >
        window.innerHeight) {
      document.activeElement.scrollIntoView()
    }
  }
})
