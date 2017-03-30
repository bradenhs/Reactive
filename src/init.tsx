import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { app, styles, view } from '~/index'

export function init() {
  styles.addBaseStyles()
  styles.addFonts()

  injectTapEventPlugin()

  ReactDOM.render(<view.App/>, document.querySelector('#app'))

  if (ENVIRONMENT === 'mobile-app') {
    document.addEventListener('deviceready', () => {
      if (device.platform === 'iOS') {
        app.setTopPadding(20)
        Keyboard.shrinkView(true)
        Keyboard.hideFormAccessoryBar(true)
      } else {
        app.setTopPadding(25)
      }

      navigator.splashscreen.hide()

      // Initialize status bar
      StatusBar.styleBlackOpaque()
      StatusBar.show()
    }, false)
  }
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
