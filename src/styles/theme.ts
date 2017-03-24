import * as colors from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export const primary1Color = colors.blue500
export const primary2Color = colors.blue700

export const accent1Color = colors.deepOrange500

export function getTheme() {
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
