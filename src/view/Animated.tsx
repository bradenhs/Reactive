import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { style, types } from 'typestyle'
import { styles } from '~/index'

interface IProps {
  willEnter: types.NestedCSSProperties
  didEnter: types.NestedCSSProperties
  didLeave: types.NestedCSSProperties
  children?: React.ReactNode,
  delay?: boolean
}

export const Animated = ReactiveComponent((props: IProps) =>
  <ReactCSSTransitionGroup
    transitionName={ getTransitionNames(props) }
    transitionEnterTimeout={ props.delay ? 700 : 500 }
    transitionLeaveTimeout={ 500 }
  >
    { props.children }
  </ReactCSSTransitionGroup>
)

function getTransitionNames(props: IProps) {
  const delay = { transitionDelay: props.delay ? '200ms' : '0ms' }
  const transition = { transition: styles.transition }
  const enter = style({
    ...delay, ...transition, ...props.willEnter
  })
  const enterActive = style({
    ...delay, ...transition, ...props.willEnter, ...props.didEnter
  })
  const leave = style({
    ...transition, ...props.didLeave, ...props.didEnter
  })
  const leaveActive = style({
    ...transition, ...props.didLeave
  })
  return {
    enter, enterActive, leave, leaveActive
  }
}
