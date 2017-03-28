import Drafts from 'material-ui/svg-icons/content/drafts'
import * as Models from '~/model'

interface IProps {
  envelope: Models.Envelope
  index: number
}

export const Envelope = ReactiveComponent((props: IProps) => {
  console.log(props)
  return <div>
    <MUI.ListItem
      leftAvatar={<MUI.Avatar icon={ <Drafts /> } /> }
      primaryText='Hello'
      secondaryText={ '$291.50' }
    />
  </div>
})
