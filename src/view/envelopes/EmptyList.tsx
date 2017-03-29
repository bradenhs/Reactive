import { style } from 'typestyle'
import { app, icons } from '~/index'

export const EmptyList = ReactiveComponent(() =>
  <div className={ getClassName() }>
    <icons.EnvelopeIcon/>
    No envelopes
  </div>
)

function getClassName() {
  return style({
    position: 'absolute',
    textAlign: 'center',
    right: '0',
    left: '0',
    fontFamily: 'Roboto',
    fontSize: '22px',
    color: app.theme.palette.accent3Color + ' !important',
    $nest: {
      '& svg': {
        display: 'block !important',
        width: '120px !important',
        height: '120px !important',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '50px',
        marginBottom: '20px',
        color: app.theme.palette.accent3Color + ' !important'
      }
    }
  })
}
