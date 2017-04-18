import { important } from 'csx'
import { classes } from 'typestyle'
import { app, icons, model, styles, utils } from '~/index'

interface IProps {
  envelope: model.Envelope
  transactionInputRef: (c: __MaterialUI.TextField) => void
}

export const EnterTransaction = ReactiveComponent(({ envelope, transactionInputRef }: IProps) => {
  let numberField: __MaterialUI.TextField
  let noteField: __MaterialUI.TextField
  return <MUI.Paper className={ getClassName(envelope) } zDepth={ envelope.isTransacting ? 1 : 0 }>
    <div className={ getInputsContainerClassName(envelope) }>
      <span className={ getPlaceholderClassName() }>
        { getPlaceholderText(envelope) }
        <span style={ { color: 'white' } }>{
          envelope.addRemaining ? app.unallocated.toFixed(2) :
          envelope.transactionAmountInputValue
        }</span>
      </span>
      <div onTouchTap={ e => {
        e.stopPropagation()
        numberField && numberField.focus()
      } }>
        <MUI.TextField
          className={ getTransactionFieldClassName() }
          value={
            envelope.addRemaining ? app.unallocated.toFixed(2) :
            envelope.transactionAmountInputValue || ''
          }
          disabled={ envelope.addRemaining }
          underlineDisabledStyle={ { borderBottom: 'solid 1px #eee', opacity: .25 } }
          fullWidth
          id='amount'
          type={ getInputType() }
          pattern='[0-9]*'
          errorText={ envelope.transactionErrorMessage }
          errorStyle={ { position: 'absolute', right: '2px', bottom: '-12px' } }
          ref={ c => {
            numberField = c
            transactionInputRef(c)
          } }
          hintText='Amount'
          hintStyle={ { fontWeight: 400 } }
          onKeyPress={ onKeyPress }
          onChange={ (e: any) => {
            e.preventDefault()
            envelope.setTransactionAmountInputValue(e.target.value)
          } }
        />
      </div>
      { app.mode === model.Mode.MANUAL_MODE && <div onTouchTap={ e => {
        e.stopPropagation()
        noteField && noteField.focus()
      } }>
        <MUI.TextField
          className={ getNoteClassName() }
          fullWidth
          ref={ c => noteField = c}
          hintStyle={ {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: important('calc(100% - 60px)')
          } }
          value={ envelope.noteInputValue || '' }
          onChange={ (e: any) => envelope.setNoteInputValue(e.target.value) }
          hintText='Note (optional)'
        />
      </div> }
      { app.mode !== model.Mode.MANUAL_MODE && <div onTouchTap={
        e => {
          e.stopPropagation()
          envelope.toggleAddRemaining()
        }
      }>
        <MUI.Toggle
          style={ {
            marginTop: '14px',
            marginLeft: '7px'
          } }
          labelStyle={ {
            fontSize: '14px',
            color: app.theme.palette.accent3Color,
            fontWeight: 300,
            marginLeft: '10px'
          } }
          toggled={ envelope.addRemaining || false }
          label='Add remaining'
          labelPosition='right'
        />
      </div> }
    </div>
    <MUI.FloatingActionButton
      onTouchTap={ () => transfer(envelope) }
      zDepth={ 1 }
      backgroundColor={ app.theme.palette.canvasColor }
      iconStyle={ { fill: app.theme.palette.accent3Color } }
      className={ getTransferButtonClassName(envelope) }
    >
      <icons.TransferIcon/>
    </MUI.FloatingActionButton>
    <MUI.FloatingActionButton
      zDepth={ 1 }
      onTouchTap={ () => deposit(envelope) }
      backgroundColor={
        app.mode === model.Mode.PAYDAY_MODE ?
        app.theme.palette.primary1Color :
        app.theme.palette.canvasColor
      }
      iconStyle={ app.mode === model.Mode.PAYDAY_MODE ?
                  { } :
                  { fill: app.theme.palette.accent3Color }}
      className={ getAddButtonClassName(envelope) }
    >
      <icons.AddIcon/>
    </MUI.FloatingActionButton>
    <MUI.FloatingActionButton
      onTouchTap={ () => withdraw(envelope) }
      className={ getMinusButtonClassName(envelope) }
    >
      <icons.MinusIcon/>
    </MUI.FloatingActionButton>
  </MUI.Paper>
})

function getInputType() {
  if (typeof device === 'object' && device.platform === 'Android') {
    return 'number'
  } else {
    return 'text'
  }
}

function getInputsContainerClassName(envelope: model.Envelope) {
  return utils.style({
    opacity: envelope.isTransacting ? 1 : 0,
    transition: styles.transition,
    position: 'relative'
  })
}

function withdraw(envelope: model.Envelope) {
  const amount = getValue(envelope)
  if (amount == undefined) {
    envelope.setTransactionErrorMessage('Enter an amount')
    return
  }
  envelope.withdraw(amount)
}

function deposit(envelope: model.Envelope) {
  if (envelope.addRemaining) {
    envelope.deposit(app.unallocated)
    app.setUnallocated(0)
  } else {
    const amount = getValue(envelope)
    if (amount == undefined) {
      envelope.setTransactionErrorMessage('Enter an amount')
      return
    }
    if (app.mode === model.Mode.PAYDAY_MODE) {
      if (amount > app.unallocated) {
        const diff = utils.formatCurrency(amount - app.unallocated)
        envelope.setTransactionErrorMessage(`${diff} short`)
        return
      } else {
        app.setUnallocated(app.unallocated - amount)
      }
    }
    envelope.deposit(amount)
  }
  if (Math.round(app.unallocated * 100) === 0) {
    app.setMode(model.Mode.MANUAL_MODE)
  }
  // if (app.mode === model.Mode.PAYDAY_MODE) {
  //   const index = app.sortedEnvelopes.indexOf(app.activeEnvelope)
  //   const newEnvelopeId = app.sortedEnvelopes[index] && app.sortedEnvelopes[index].id
  //   if (newEnvelopeId) {
  //     app.activeEnvelopeId = newEnvelopeId
  //   }
  // }
}

function transfer(_: model.Envelope) {
  alert('This feature not yet implemented')
}

function getValue(envelope: model.Envelope) {
  if (envelope.transactionAmountInputValue == undefined ||
      envelope.transactionAmountInputValue.trim() === '') {
    return undefined
  }
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
  return utils.style({
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
  const value = envelope.addRemaining ? app.unallocated.toFixed(2) :
              envelope.transactionAmountInputValue
  if (value == undefined) {
    return '0.00'
  }
  if (value.length > 4) {
    return ''
  }
  return '0.00'.slice(0, 4 - value.length)
}

function getNoteClassName() {
  return utils.style({
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
  return utils.style({
    transform: `scale(${envelope.isTransacting ? 1 : 0})`,
    opacity: envelope.isTransacting ? 1 : 0,
    transformOrigin: '28px 33px',
    position: 'absolute',
    bottom: '-23px'
  })
}

function getAddButtonClassName(envelope: model.Envelope) {
  return classes(getBaseButtonClass(envelope), utils.style({
    right: app.mode === model.Mode.PAYDAY_MODE ? '20px' : '100px',
  }))
}
function getTransferButtonClassName(envelope: model.Envelope) {
  return classes(getBaseButtonClass(envelope), utils.style({
    right: '180px',
    display: important(app.mode === model.Mode.PAYDAY_MODE ? 'none' : 'block'),
  }))
}
function getMinusButtonClassName(envelope: model.Envelope) {
  return classes(getBaseButtonClass(envelope), utils.style({
    right: '20px',
    display: important(app.mode === model.Mode.PAYDAY_MODE ? 'none' : 'block'),
  }))
}

function getClassName(envelope: model.Envelope) {
  return utils.style({
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

function getTransactionFieldClassName() {
  return utils.style({
    fontSize: '20px !important',
    $nest: {
      '& > *': {
        marginTop: '-1px',
        textAlign: important('right')
      },
      '& > [disabled]': {
        marginTop: important('0px'),
        color: important('#555'),
        fontWeight: important(400) as any
      }
    }
  })
}
