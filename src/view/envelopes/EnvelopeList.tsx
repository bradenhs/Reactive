import { important } from 'csx'
import { app, utils, view } from '~/index'

export const EnvelopeList = ReactiveComponent(() =>
  <div className={ getContainerClassName() } onTouchTap={ app.closeAllEnvelopes }>
    <div className={ getClassName() }>
      <div onTouchTap={ utils.stopPropagation }>
        <view.Animated
          willEnter={ { opacity: important(0) as any } }
          didEnter={ { opacity: important(1) as any } }
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
  return utils.style({
    position: 'absolute',
    left: '0',
    right: '0',
    height: (app.sortedEnvelopes.length * 72 + 200) + 'px'
  })
}
