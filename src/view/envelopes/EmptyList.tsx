import { app, icons, styles, utils } from '~/index'

export const EmptyList = ReactiveComponent(() =>
  <div className={ getClassName() }>
    <icons.EnvelopeIcon/>
    No envelopes
  </div>
)

function getClassName() {
  return utils.style({
    position: 'absolute',
    textAlign: 'center',
    right: '0',
    left: '0',
    fontFamily: 'Roboto',
    fontSize: '22px',
    transition: styles.transition,
    transform: `translateY(${app.loading ? 40 : 0}px)`,
    opacity: app.loading || app.sortedEnvelopes.length > 0 ? 0 : 1,
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
