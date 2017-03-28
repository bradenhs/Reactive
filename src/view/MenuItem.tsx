import * as colors from 'material-ui/styles/colors'
import { style } from 'typestyle'
import { app } from '~/app'

interface IProps {
  icon: JSX.Element
  text: string
  onTouchTap: () => void
}

const className = style({
  $nest: {
    '& > svg': {
      color: app.theme.palette.accent3Color + ' !important'
    }
  }
})

export const MenuItem = ReactiveComponent((props: IProps) =>
  <MUI.ListItem
      leftAvatar={
        <MUI.Avatar
          backgroundColor={ colors.transparent }
          className={ className }
        >
          { props.icon }
        </MUI.Avatar>
      }
      primaryText={ props.text }
      onTouchTap={ props.onTouchTap }
  />
)
