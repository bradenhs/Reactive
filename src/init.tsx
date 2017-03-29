import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { styles, view } from '~/index'

export function init() {
  styles.addBaseStyles()
  styles.addFonts()

  injectTapEventPlugin()

  ReactDOM.render(<view.App/>, document.querySelector('#app'))

  if (ENVIRONMENT === 'mobile-app') {
    document.addEventListener('deviceready', () => {
      if (device.platform === 'iOS') {
        Keyboard.shrinkView(true)
        Keyboard.hideFormAccessoryBar(true)
      }

      navigator.splashscreen.hide()

      // Initialize status bar
      StatusBar.styleBlackOpaque()
      StatusBar.show()
    }, false)
  }
}
