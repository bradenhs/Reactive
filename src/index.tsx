import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import { state } from '~/state'
import { App } from '~/components'

// Remove 300ms delay for click events
injectTapEventPlugin()

ReactDOM.render(<App/>, document.querySelector('#app'))

if (ENVIRONMENT === 'website') {
  // Added to allow client specific styling
  document.body.classList.add('website')
  state.setAsReady()
}

if (ENVIRONMENT === 'mobile-app') {
  document.body.classList.add('mobile-app')

  // Special cordova event fired when in app
  document.addEventListener('deviceready', () => {

    // Added to allow client specific styling
    document.body.classList.add('platform-' + device.platform)

    if (device.platform === 'iOS') {
      Keyboard.shrinkView(true)
      Keyboard.hideFormAccessoryBar(true)
    }

    // Handle back button (only for android)
    document.addEventListener('backbutton', () => {
      // Override backbutton behavior here
    }, false)

    navigator.splashscreen.hide()

    // Initialize status bar
    StatusBar.styleBlackOpaque()
    StatusBar.show()

    state.setAsReady()
  }, false)
}