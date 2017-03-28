import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { style } from 'typestyle'
import { app } from '~/app'
import { EnvelopeIcon } from '~/constants'
import * as View from '~/view'

const envelopeListClass = style({
  position: 'absolute',
  left: '0',
  right: '0',
  top: '64px',
  bottom: '0',
  overflowY: 'scroll',
})

const outClass = style({
  transform: 'translateY(-50px) !important'
})
const inClass = style({
  transform: 'translateY(0px) !important'
})

const noEnvelopes = style({
  textAlign: 'center',
  paddingTop: '75px',
  fontFamily: 'Roboto',
  color: app.theme.palette.accent3Color,
  fontSize: '22px',
  $nest: {
    '& > svg': {
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block !important',
      color: app.theme.palette.accent3Color + ' !important',
      width: '130px !important',
      height: '130px !important',
      marginBottom: '40px'
    }
  }
})

const EmptyList = ReactiveComponent(() =>
  <div className={ noEnvelopes }>
    <EnvelopeIcon/>
    No envelopes
  </div>
)

const List = ReactiveComponent(() =>
  <ReactCSSTransitionGroup
    transitionName={ {
      enter: outClass, enterActive: inClass, leave: inClass, leaveActive: outClass
    } }
    transitionEnterTimeout={ 450 }
    transitionLeaveTimeout={ 450 }
  >
    { app.sortedEnvelopes.map((envelope) =>
      <View.Envelope
        key={ envelope.id }
        envelope={ envelope }
      />
    ) }
  </ReactCSSTransitionGroup>
)

export const EnvelopeList = ReactiveComponent(() =>
  <div className={ envelopeListClass }>
    <ReactCSSTransitionGroup
      transitionName={ {
        enter: outClass, enterActive: inClass, leave: inClass, leaveActive: outClass
      } }
      transitionEnterTimeout={ 450 }
      transitionLeaveTimeout={ 450 }
    >
      { app.sortedEnvelopes.length > 0 ? <List/> : <EmptyList/> }
    </ReactCSSTransitionGroup>
  </div>
)
