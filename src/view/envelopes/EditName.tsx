import { icons, model, styles, utils } from '~/index'

interface IProps {
  envelope: model.Envelope
}

export const EditName = ReactiveComponent(({ envelope }: IProps) => {
  let textField: __MaterialUI.TextField
  return <MUI.Paper className={ getClassName(envelope) } zDepth={ envelope.isNaming ? 1 : 0 }>
    <div onTouchTap={ e => {
      e.stopPropagation()
      textField && textField.focus()
    } }>
      <MUI.TextField
        className={ getTextFieldClassName() }
        value={ envelope.nameInputValue || '' }
        fullWidth
        hintText='Envelope Name'
        hintStyle={ { fontWeight: 400 } }
        ref={ c => textField = c }
        onChange={ (e: any) => envelope.setNameInputValue(e.target.value) }
      />
    </div>
    <MUI.FloatingActionButton
      onTouchTap={ () => setEnvelopeName(envelope) }
      className={ getDoneButtonClassName(envelope) }
    >
      <icons.DoneIcon/>
    </MUI.FloatingActionButton>
  </MUI.Paper>
})

function setEnvelopeName(envelope: model.Envelope) {
  const normalizedInputValue = (envelope.nameInputValue || '').trim()
  envelope.setName(normalizedInputValue)
}

function getClassName(envelope: model.Envelope) {
  return utils.style({
    height: styles.namingViewHeight + 'px',
    paddingLeft: '16px',
    paddingRight: '16px',
    position: 'absolute',
    pointerEvents: envelope.isNaming ? 'auto' : 'none',
    opacity: envelope.isNaming ? 1 : 0,
    transform: `translateY(${envelope.isNaming ? 0 : -styles.namingViewHeight}px)`,
    left: 0, right: 0,
  })
}

function getTextFieldClassName() {
  return utils.style({
    pointerEvents: 'none',
    fontSize: '20px !important',
  })
}

function getDoneButtonClassName(envelope: model.Envelope) {
  return utils.style({
    transform: `scale(${envelope.isNaming ? 1 : 0})`,
    opacity: envelope.isNaming ? 1 : 0,
    transformOrigin: '28px 33px',
    position: 'absolute',
    right: '20px',
    bottom: '-23px'
  })
}
