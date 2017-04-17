import { createApp } from '~/app'
import * as icons from '~/icons'
import * as model from '~/model'
import * as styles from '~/styles'
import * as utils from '~/utils'
import * as view from '~/view'
import { init } from './init'

const app = createApp()

// Expose all top level folders for easy importing
export {
  icons, model, styles, utils, view, app
}

init()
