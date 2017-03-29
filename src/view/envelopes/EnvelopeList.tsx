import { style } from 'typestyle'
import { app, view } from '~/index'

export const EnvelopeList = ReactiveComponent(() =>
  <div className={ getClassName() }>
    { app.sortedEnvelopes.map(envelope =>
      <view.Envelope key={ envelope.id } envelope={ envelope } />
    )}
  </div>
)

function getClassName() {
  return style({
    position: 'absolute',
    left: '0',
    right: '0'
  })
}
