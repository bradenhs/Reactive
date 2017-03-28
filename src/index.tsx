import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as styles from '~/styles'
import * as View from '~/view'

styles.addBaseStyles()
styles.addFonts()

// Remove 300ms delay for click events
injectTapEventPlugin()

ReactDOM.render(<View.App/>, document.querySelector('#app'))

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
