import ReactiveComponent from 'fnx/react'
import { style } from 'typestyle'
import { app } from '~/app'
import * as View from '~/view'

const envelopeListClass = style({
  position: 'absolute',
  left: '0',
  right: '0',
  top: '64px',
  bottom: '0',
  overflowY: 'scroll'
})

export const EnvelopeList = ReactiveComponent(() =>
  <div className={ envelopeListClass }>
    { app.sortedEnvelopes.map((envelope, index) =>
      <View.Envelope
        key={ envelope.id }
        index={ index }
        envelope={ envelope }
      />
    ) }
  </div>
)
