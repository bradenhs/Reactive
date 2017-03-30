import { important } from 'csx'
import { classes, style } from 'typestyle'
import { app, icons, model, styles } from '~/index'

interface IProps {
  envelope: model.Envelope
}

export const EnterTransaction = ReactiveComponent(({ envelope }: IProps) => {
  let numberField: __MaterialUI.TextField
  let noteField: __MaterialUI.TextField
  return <MUI.Paper className={ getClassName(envelope) } zDepth={ envelope.isTransacting ? 1 : 0 }>
    <div className={ getInputsContainerClassName(envelope) }>
      <span className={ getPlaceholderClassName() }>
        { getPlaceholderText(envelope) }
        <span style={ { color: 'white' } }>{ envelope.transactionAmountInputValue }</span>
      </span>
      <div onTouchTap={ e => {
        e.stopPropagation()
        numberField && numberField.focus()
      } }>
        <MUI.TextField
          className={ getTextFieldClassName() }
          value={ envelope.transactionAmountInputValue || '' }
          fullWidth
          id='amount'
          type='tel'
          ref={ c => numberField = c}
          hintText='Amount'
          hintStyle={ { fontWeight: 400 } }
          onKeyPress={ onKeyPress }
          onChange={ (e: any) => {
            e.preventDefault()
            envelope.setTransactionAmountInputValue(e.target.value)
          } }
        />
      </div>
      <div onTouchTap={ e => {
        e.stopPropagation()
        noteField && noteField.focus()
      } }>
        <MUI.TextField
          className={ getNoteClassName() }
          fullWidth
          ref={ c => noteField = c}
          hintStyle={ {
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'
          } }
          value={ envelope.noteInputValue || '' }
          onChange={ (e: any) => envelope.setNoteInputValue(e.target.value) }
          hintText='Note (optional)'
        />
      </div>
    </div>
    <MUI.FloatingActionButton
      onTouchTap={ () => withdraw(envelope) }
      zDepth={ 1 }
      backgroundColor={ app.theme.palette.canvasColor }
      iconStyle={ { fill: app.theme.palette.accent3Color } }
      className={ getTransferButtonClassName(envelope) }
      mini
    >
      <icons.TransferIcon/>
    </MUI.FloatingActionButton>
    <MUI.FloatingActionButton
      zDepth={ 1 }
      onTouchTap={ () => deposit(envelope) }
      backgroundColor={ app.theme.palette.canvasColor }
      iconStyle={ { fill: app.theme.palette.accent3Color } }
      className={ getAddButtonClassName(envelope) }
      mini
    >
      <icons.AddIcon/>
    </MUI.FloatingActionButton>
    <MUI.FloatingActionButton
      onTouchTap={ () => transfer(envelope) }
      className={ getMinusButtonClassName(envelope) }
      mini
    >
      <icons.MinusIcon/>
    </MUI.FloatingActionButton>
  </MUI.Paper>
})

function getInputsContainerClassName(envelope: model.Envelope) {
  return style({
    opacity: envelope.isTransacting ? 1 : 0,
    transition: styles.transition,
    position: 'relative'
  })
}

function withdraw(envelope: model.Envelope) {
  envelope.withdraw(getValue(envelope))
}

function deposit(envelope: model.Envelope) {
  envelope.deposit(getValue(envelope))
}

function transfer(envelope: model.Envelope) {
  envelope.withdraw(getValue(envelope))
}

function getValue(envelope: model.Envelope) {
  let v = envelope.transactionAmountInputValue || '0'
  if (v.length === 1) {
    v = '.0' + v
  } else if (v.length === 2) {
    v = '.' + v
  }
  return parseFloat(v)
}

function onKeyPress(e: React.KeyboardEvent<{}>) {
  if (!/\d/.test(String.fromCharCode(e.which))) {
    e.preventDefault()
  }
}

function getPlaceholderClassName() {
  return style({
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '20px',
    fontWeight: 300,
    right: '0',
    top: '12px',
    textAlign: 'right',
    color: app.theme.palette.accent3Color,
    $nest: {
      '&::before': {
        content: `'$'`,
        position: 'absolute',
        marginLeft: '-17px'
      }
    }
  })
}

function getPlaceholderText(envelope: model.Envelope) {
  if (envelope.transactionAmountInputValue == undefined) {
    return '0.00'
  }
  if (envelope.transactionAmountInputValue.length > 4) {
    return ''
  }
  return '0.00'.slice(0, 4 - envelope.transactionAmountInputValue.length)
}

function getNoteClassName() {
  return style({
    fontSize: '14px !important',
    marginTop: '-10px',
    $nest: {
      '& > div:last-child': {
        display: 'none'
      }
    }
  })
}

function getBaseButtonClass(envelope: model.Envelope) {
  return style({
    transform: `scale(${envelope.isTransacting ? 1 : 0})`,
    opacity: envelope.isTransacting ? 1 : 0,
    transformOrigin: '20px 25px',
    position: 'absolute',
    bottom: '-15px'
  })
}

function getAddButtonClassName(envelope: model.Envelope) {
  return classes(getBaseButtonClass(envelope), style({
    right: '80px',
  }))
}
function getTransferButtonClassName(envelope: model.Envelope) {
  return classes(getBaseButtonClass(envelope), style({
    right: '140px',
  }))
}
function getMinusButtonClassName(envelope: model.Envelope) {
  return classes(getBaseButtonClass(envelope), style({
    right: '20px',
  }))
}

function getClassName(envelope: model.Envelope) {
  return style({
    paddingLeft: '16px',
    paddingRight: '16px',
    position: 'absolute',
    height: styles.transactingViewHeight + 'px',
    pointerEvents: envelope.isTransacting ? 'auto' : 'none',
    opacity: envelope.isTransacting ? 1 : 0,
    transform: `translateY(${envelope.isTransacting ? 0 : -styles.transactingViewHeight}px)`,
    left: 0, right: 0,
  })
}

function getTextFieldClassName() {
  return style({
    fontSize: '20px !important',
    $nest: {
      '& > *': {
        textAlign: important('right')
      }
    }
  })
}
