import { style } from 'typestyle'
import { icons, model, styles, utils } from '~/index'

interface IProps {
  envelope: model.Envelope
}

export const EditName = ReactiveComponent(({ envelope }: IProps) =>
  <MUI.Paper className={ getClassName(envelope) } zDepth={ envelope.isNaming ? 1 : 0 }>
    <div className={ style({ height: '100%', overflow: 'hidden' })}>
      <MUI.TextField
        className={ getTextFieldClassName() }
        value={ envelope.nameInputValue || '' }
        fullWidth
        hintText='Envelope Name'
        onChange={ (e: any) => envelope.setNameInputValue(e.target.value) }
      />
    </div>
    <MUI.FloatingActionButton
      onTouchTap={ () => setEnvelopeName(envelope) }
      className={ getDoneButtonClassName(envelope) }
      mini
    >
      <icons.DoneIcon/>
    </MUI.FloatingActionButton>
  </MUI.Paper>
)

function setEnvelopeName(envelope: model.Envelope) {
  const normalizedInputValue = (envelope.nameInputValue || '').trim()
  utils.closeKeyboardThen(() => envelope.setName(normalizedInputValue))
}

function getClassName(envelope: model.Envelope) {
  return style({
    height: (envelope.isNaming ? styles.namingViewHeight : 0) + 'px',
    paddingLeft: '16px',
    paddingRight: '16px',
    position: 'absolute',
    left: 0, right: 0,
  })
}

function getTextFieldClassName() {
  return style({
    fontSize: '20px !important',
  })
}

function getDoneButtonClassName(envelope: model.Envelope) {
  return style({
    transform: `scale(${envelope.isNaming ? 1 : 0})`,
    opacity: envelope.isNaming ? 1 : 0,
    transformOrigin: '20px 25px',
    position: 'absolute',
    right: '20px',
    bottom: '-15px'
  })
}
