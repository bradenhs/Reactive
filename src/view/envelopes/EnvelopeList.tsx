import { important } from 'csx'
import { style } from 'typestyle'
import { app, styles, utils, view } from '~/index'

export const EnvelopeList = ReactiveComponent(() =>
  <div className={ getContainerClassName() } onTouchTap={ closeAllEnvelopes }>
    <div className={ getClassName() } onTouchTap={ utils.stopPropagation }>
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
)

function closeAllEnvelopes() {
  utils.closeKeyboardThen(app.closeAllEnvelopes)
}

function getContainerClassName() {
  return style({
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
  let listHeight = Object.keys(app.envelopes).length * 72
  if (app.activeEnvelopeId != undefined) {
    listHeight += app.activeEnvelope.isNaming ?
                  styles.namingViewHeight :
                  styles.transactingViewHeight
  }
  return style({
    position: 'absolute',
    left: '0',
    right: '0',
    transition: styles.transition,
    marginBottom: '96px',
    height: listHeight + 'px',
    background: app.activeEnvelopeId == undefined ? '#fff' : '#eee'
  })
}
