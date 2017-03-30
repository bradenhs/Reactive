import { important } from 'csx'
import * as colors from 'material-ui/styles/colors'
import * as AnimatedNumber from 'react-animated-number'
import { style } from 'typestyle'
import { app, icons, model, styles, utils, view } from '~/index'

interface IProps {
  envelope: model.Envelope
}

let tapNum = 0

export const Envelope = ReactiveComponent(({ envelope }: IProps) =>
  <MUI.Paper
    key={ envelope.id }
    className={ getEnvelopeClassName(envelope) }
    zDepth={ envelope.isNaming || envelope.isTransacting ? 1 : 0 }
  >
    <div
      className={ getContentClassName() }
      onTouchTap={ () =>
        envelope.isNaming || envelope.isTransacting ?
        app.closeAllEnvelopes() :
        envelope.name === '' ? envelope.enterRenameView() : envelope.enterNewTransactionView()
      }
    >
      <MUI.Avatar
        backgroundColor={ app.theme.palette.accent2Color }
        color={ envelope.isNaming || envelope.isTransacting ?
                app.theme.palette.primary1Color :
                app.theme.palette.accent3Color}
        icon={ <icons.EnvelopeIcon/> }
      />
      <span className={ getEnvelopeNameClassName(envelope) }>
        { envelope.isNaming ?
          envelope.nameInputValue || 'Unnamed' :
          envelope.name || 'Unnamed' }
      </span>
      <span className={ getAmountClassName(envelope) }>
        <AnimatedNumber
          value={ envelope.amount }
          formatValue={ v => utils.formatCurrency(v) }
          duration={ 450 }
        />
      </span>
      <div onTouchTap={ iconMenuTap }>
        <MUI.IconMenu
          key={ tapNum }
          iconButtonElement={<MUI.IconButton><icons.MoreIcon /></MUI.IconButton>}
          anchorOrigin={ {horizontal: 'left', vertical: 'bottom'} }
          targetOrigin={ {horizontal: 'left', vertical: 'top'} }
          className={ getMoreButtonClassName(envelope) }
        >
          <MUI.MenuItem
            primaryText='Rename'
            onTouchTap={ envelope.enterRenameView }
            disabled={ envelope.isNaming }
          />
          <MUI.MenuItem primaryText='History'/>
          <MUI.MenuItem primaryText='Delete' onTouchTap={ envelope.remove }/>
        </MUI.IconMenu>
      </div>
    </div>
    <div style={ { paddingTop: '72px' } }>
      <view.EditName key='name' envelope={ envelope }/>
      <view.EnterTransaction key='transaction' envelope={ envelope }/>
    </div>
  </MUI.Paper>
)

function iconMenuTap(e: __MaterialUI.TouchTapEvent) {
  tapNum++
  utils.stopPropagation(e)
}

function getContentClassName() {
  return style({
    padding: '16px', overflowX: 'hidden', width: '100%', boxSizing: 'border-box',
    zIndex: 2, position: 'absolute',
    background: 'white'
  })
}

function getMoreButtonClassName(envelope: model.Envelope) {
  return style({
    position: important('absolute'),
    transition: styles.transition,
    transform: `translateX(${envelope.isTransacting || envelope.isNaming ? 0 : 48}px)`,
    pointerEvents: envelope.isTransacting || envelope.isNaming ? 'auto' : 'none',
    right: '8px',
    top: '12px',
    opacity: envelope.isTransacting || envelope.isNaming ? 1 : 0
  })
}

function getEnvelopeClassName(envelope: model.Envelope) {
  return style({
    zIndex: envelope.isInactive ? 1 : 2,
    opacity: envelope.isInactive ? .5 : 1,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) !important',
    position: 'absolute',
    transform: `translateY(${envelope.yPosition}px) !important`,
    left: 0,
    right: 0,
    $nest: envelope.isInactive ? {
      '&::after': {
        content: `''`,
        position: 'absolute',
        left: '0',
        right: '0',
        height: '10px',
        bottom: '-5px',
        background: 'white',
        transition: styles.transition,
        opacity: 0
      } } : {
      '&::after': {
        content: `''`,
        position: 'absolute',
        left: '0',
        right: '0',
        height: '10px',
        bottom: '-5px',
        transition: styles.transition,
        background: 'white',
        opacity: 1
      }
    },
  })
}

function getEnvelopeNameClassName(envelope: model.Envelope) {
  const showUnnamedStyle =
    (!envelope.isNaming && !envelope.name) ||
    (envelope.isNaming && !envelope.nameInputValue)
  return style({
    position: 'absolute',
    top: '0',
    left: '76px',
    right: envelope.isTransacting ? '140px' : '76px',
    fontSize: '16px',
    lineHeight: '72px',
    whiteSpace: 'nowrap',
    color: app.theme.palette.textColor,
    overflow: 'hidden',
    transition: styles.transition,
    textOverflow: 'ellipsis',
    fontStyle: showUnnamedStyle ? 'italic' : 'normal',
    opacity: showUnnamedStyle ? .7 : 1
  })
}

function getAmountClassName(envelope: model.Envelope) {
  return style({
    position: 'absolute',
    top: '0',
    right: '16px',
    transition: styles.transition,
    transform: `translateX(${envelope.isTransacting || envelope.isNaming ? -48 : 0}px)`,
    textAlign: 'right',
    lineHeight: '72px',
    fontSize: '16px',
    fontWeight: 600,
    color: envelope.amount < 0 ? colors.red800 : app.theme.palette.textColor,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })
}
