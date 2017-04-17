import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as model from '~/model'
import * as view from '~/view'

injectTapEventPlugin()

export const app = new model.AppModel({
  menu: {
    isOpen: false
  },
  mode: model.Mode.MANUAL_MODE,
})

ReactDOM.render(<view.App/>, document.querySelector('#app'))
