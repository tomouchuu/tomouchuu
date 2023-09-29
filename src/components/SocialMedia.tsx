import {IconName, IconProp, library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope, faFileAlt, faNewspaper} from '@fortawesome/free-regular-svg-icons';
library.add(fab, faSquare, faEnvelope, faFileAlt, faNewspaper);

interface Props {
  network: IconName | 'applemusic' | 'blog' | 'cv' | 'email'
  scale: string
  url: string
}

const SocialMedia = (props: Props) => {
  const icon = (): IconProp => {
    if (props.network === 'email') {
      return ['far', 'envelope'];
    } else if (props.network === 'blog') {
      return ['far', 'newspaper'];
    } else if (props.network === 'applemusic') {
      return ['fab', 'itunes-note'];
    } else if (props.network === 'cv') {
      return ['far', 'file-alt'];
    }
    return ['fab', props.network];
  }

  const scale = () => {
    if (props.scale) { return `fa-${props.scale}`; }
    return 'fa-lg';
  }

  const title = () => {
    if (props.network === 'email') {
      return 'Email me';
    } else if (props.network === 'blog') {
      return 'My blog';
    } else if (props.network === 'applemusic') {
      return 'Apple Music';
    } else if (props.network === 'cv') {
      return 'My CV';
    }
    return `Find me on ${props.network}`;
  }

  const link = () => {
    if (props.network === 'email') {
      return `mailto:${props.url}`;
    }
    return props.url
  }


  return (
    <a
      href={link()}
      rel="noopener"
      target={props.network === 'cv' ? '_blank': ''}
      title={title()}
    >
      <span className={`m-1 fa-layers fa-fw ${scale()} socials ${props.network}`}>
        <FontAwesomeIcon icon="square" size="lg" />
        <FontAwesomeIcon icon={icon()} size="xs" className="socialicon" />
      </span>
    </a>
  );
}

export default SocialMedia;