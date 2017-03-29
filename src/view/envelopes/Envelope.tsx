import { model } from '~/index'

interface IProps {
  envelope: model.Envelope
}

export const Envelope = ReactiveComponent((props: IProps) =>
  <MUI.Paper>
    { props.envelope.id }
  </MUI.Paper>
)
