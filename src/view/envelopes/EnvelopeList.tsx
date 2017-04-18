import { important } from 'csx'
import { app, model, styles, utils, view } from '~/index'

export const EnvelopeList = ReactiveComponent(() =>
  <div className={ getContainerClassName() } onTouchTap={ app.closeAllEnvelopes }>
    <div className={ getClassName() }>
      <div onTouchTap={ utils.stopPropagation }>
        <div className={ getUnallocatedClassName() }>
          { utils.formatCurrency(app.unallocated) } uncategorized
          <MUI.FlatButton
            style={ { position: 'absolute', top: '9px', right: '9px' } }
            label='Categorize'
            primary
            onTouchTap={ () => app.setMode(model.Mode.PAYDAY_MODE)}
          />
        </div>
        <view.Animated
          willEnter={ {
            transform: `translateY(-${styles.namingViewHeight}px) !important`,
            opacity: important(0) as any }
          }
          didEnter={ {
            transform: `translateY(0px) !important`,
            opacity: important(1) as any
          } }
          didLeave={ { opacity: important(0) as any } }
        >
          { Object.keys(app.envelopes).map(id =>
            <view.Envelope key={ id } envelope={ app.envelopes[id] } />
          )}
        </view.Animated>
      </div>
    </div>
  </div>
)

function getUnallocatedClassName() {
  return utils.style({
    position: 'absolute',
    height: '56px',
    left: '0',
    right: '0',
    lineHeight: '56px',
    background: app.theme.palette.canvasColor,
    paddingLeft: '20px',
    paddingRight: '20px',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    opacity: .9,
    transition: styles.transition,
    transform: `translateY(${app.unallocatedVisible ? 0 : -56}px)`
  })
}

function getContainerClassName() {
  return utils.style({
    position: 'absolute',
    left: '0',
    right: '0',
    top: (64 + app.topPadding) + 'px',
    bottom: '0',
    overflowY: 'scroll',
    overflowX: 'hidden',
    '-webkit-overflow-scrolling': 'touch'
  })
}

function getClassName() {
  const height =
    (app.sortedEnvelopes.length - 1) * 72 +
    window.innerHeight - (63 + app.topPadding)
  return utils.style({
    position: 'absolute',
    left: '0',
    right: '0',
    height: height + 'px'
  })
}
