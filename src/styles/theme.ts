import * as colors from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export function getTheme() {
  return getMuiTheme({
    palette: {
      primary1Color: colors.deepOrange500,
      primary2Color: colors.deepOrange700,
      accent1Color: colors.blue500,
    },
    drawer: {
      width: 280,
    },
  })
}
