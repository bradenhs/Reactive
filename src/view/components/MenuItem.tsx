import { important } from 'csx'
import * as colors from 'material-ui/styles/colors'
import { app } from '~/index'
import * as utils from '~/utils'

interface IProps {
  icon: JSX.Element
  text: string
  onTouchTap: () => void
}

export const MenuItem = ReactiveComponent((props: IProps) => {
  return <MUI.ListItem
    leftAvatar={
      <MUI.Avatar
        backgroundColor={ colors.transparent }
        className={ getAvatarClassName() }
      >
        { props.icon }
      </MUI.Avatar>
    }
    primaryText={ props.text }
    onTouchTap={ props.onTouchTap }
  />
})

function getAvatarClassName() {
  return utils.style({
    $nest: {
      '& > svg': {
        color: important(app.getTheme().palette.accent3Color)
      }
    }
  })
}
