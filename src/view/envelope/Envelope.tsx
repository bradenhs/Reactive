import { style } from 'typestyle'
import { app } from '~/app'
import { AddIcon, CheckIcon, EnvelopeIcon, MinusIcon, MoreIcon, TransferIcon } from '~/constants'
import * as Model from '~/model'
import { transition } from '~/styles'
import * as utils from '~/utils'

interface IProps {
  envelope: Model.Envelope
}

const envelopeClass = style({
  background: 'white',
  position: 'absolute',
  transition,
  right: '0px',
  left: '0px'
})

const textFieldContainer = style({
  padding: '4px 32px 40px 16px',
})

const textField = style({
  fontSize: '30px !important'
})

const add = style({
  position: 'absolute',
  marginTop: '-20px',
  right: '92px',
  $nest: {
    '& > button': {
      backgroundColor: 'white !important',
    },
    '& svg': {
      color: app.theme.palette.accent3Color + ' !important',
      fill: app.theme.palette.accent3Color + ' !important'
    }
  }
})
const minus = style({
  position: 'absolute',
  marginTop: '-20px',
  right: '32px'
})
const transfer = style({
  position: 'absolute',
  marginTop: '-20px',
  right: '152px',
  $nest: {
    '& > button': {
      backgroundColor: 'white !important',
    },
    '& svg': {
      color: app.theme.palette.accent3Color + ' !important',
      fill: app.theme.palette.accent3Color + ' !important'
    }
  }
})
const check = style({
  position: 'absolute',
  marginTop: '-20px',
  right: '32px',
})

const hidden = style({
  display: 'none'
})

export const Envelope = ReactiveComponent(({ envelope }: IProps) => {
  const positionClass = style({
    opacity: envelope.isInactive ? .5 : 1,
    pointerEvents: envelope.isInactive ? 'none' : 'auto',
    transform: `translateY(${envelope.yPosition}px)`,
    zIndex: envelope.isNaming || envelope.isTransacting ? 100 : 99,
    boxShadow:
      envelope.isNaming || envelope.isTransacting ?
        '0 6px 28px rgba(0,0,0,0.13), 0 4px 10px rgba(0,0,0,0.11)' : ''
  })
  const hasName = (envelope.proposedName || '').trim() !== ''
  const hasAmount = (envelope.newTransactionAmount || '').trim() !== ''
  const iconColor = envelope.isNaming || envelope.isTransacting ?
    app.theme.palette.primary1Color :
    app.theme.palette.accent3Color
  return <div className={ envelopeClass + ' ' + positionClass }>
    <MUI.ListItem
      leftAvatar={<MUI.Avatar backgroundColor={ iconColor } icon={ <EnvelopeIcon /> } /> }
      primaryText={ hasName ? envelope.proposedName : 'Envelope Name' }
      secondaryText={ utils.formatCurrency(envelope.amount) }
      rightIconButton={ renderMoreButton(envelope) }
      onTouchTap={ envelope.startTransacting }
    />
    <div className={ envelope.isTransacting ? '' : hidden }>
      <div className={ textFieldContainer }>
        <MUI.TextField
          fullWidth
          className={ textField }
          autoFocus
          type='number'
          hintText='$ Amount'
          onChange={ (e: any) => envelope.setNewTransactionAmount(e.target.value) }
        />
      </div>
      <MUI.FloatingActionButton
        mini className={ add } disabled={ !hasAmount }
        onTouchTap={ envelope.addAmount }
      >
        <AddIcon/>
      </MUI.FloatingActionButton>
      <MUI.FloatingActionButton
        mini className={ transfer } disabled={ !hasAmount }
        onTouchTap={ envelope.transferAmount }
      >
        <TransferIcon/>
      </MUI.FloatingActionButton>
      <MUI.FloatingActionButton
        mini className={ minus } disabled={ !hasAmount }
        onTouchTap={ envelope.minusAmount }
      >
        <MinusIcon/>
      </MUI.FloatingActionButton>
    </div>
    <div className={ envelope.isNaming ? '': hidden}>
      <div className={ textFieldContainer }>
        <MUI.TextField
          fullWidth
          className={ textField }
          autoFocus
          hintText='Envelope Name'
          defaultValue={ envelope.proposedName }
          onChange={ (e: any) => envelope.setProposedName(e.target.value) }
        />
      </div>
      <MUI.FloatingActionButton
        mini className={ check } disabled={ !hasName }
        onTouchTap={ envelope.commitProposedNamed }
      >
        <CheckIcon/>
      </MUI.FloatingActionButton>
    </div>
  </div>
})

function renderMoreButton(envelope: Model.Envelope) {
  return <MUI.IconMenu
    iconButtonElement={ <MUI.IconButton><MoreIcon/></MUI.IconButton> }
    anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
    targetOrigin={ { horizontal: 'right', vertical: 'top' } }
  >
    <MUI.MenuItem
      primaryText='Rename'
      onTouchTap={ envelope.startRename }
      disabled={ envelope.isNaming }
    />
    <MUI.MenuItem
      primaryText='Remove'
      disabled={ true }
      onTouchTap={ envelope.remove }
    />
  </MUI.IconMenu>
}
