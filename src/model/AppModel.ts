import fnx from 'fnx'
import * as colors from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as model from '~/model'

export const enum Mode {
  PAYDAY_MODE, TRANSFER_MODE, MANUAL_MODE
}

export class AppModel extends fnx.Model<AppModel> {
  menu = fnx.object(model.MenuModel)

  mode = fnx.number

  @fnx.computed
  getTheme?() {
    let primary1Color: string
    let primary2Color: string
    const accent1Color = colors.deepOrange500

    if (this.mode === Mode.MANUAL_MODE) {
      primary1Color = colors.blue500
      primary2Color = colors.blue700
    } else if (this.mode === Mode.PAYDAY_MODE) {
      primary1Color = colors.green600
      primary2Color = colors.green800
    } else { // mode === Mode.TRANSFER_MODE
      primary1Color = colors.purple500
      primary2Color = colors.purple700
    }

    return getMuiTheme({
      palette: {
        primary1Color,
        primary2Color,
        accent1Color,
      },
      drawer: {
        width: 280,
      },
    })
  }
}
