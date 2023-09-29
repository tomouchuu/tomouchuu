import {
  BookOpen,
  FileText,
  Headphones,
  HelpCircle,
  Mail,
  Music,
  Square,
} from "./Icons";

import {
  Discord,
  Github,
  Instagram,
  Linkedin,
  Twitch,
  Twitter,
  Youtube,
} from "./Socials";

interface Props {
  network: string;
  scale: string;
  url: string;
}

const SocialMedia = (props: Props) => {
  const icon = () => {
    if (props.network === "email") {
      return <Mail />;
    } else if (props.network === "blog") {
      return <BookOpen />;
    } else if (props.network === "applemusic") {
      return <Music />;
    } else if (props.network === "cv") {
      return <FileText />;
    } else if (props.network === "discord") {
      return <Discord />;
    } else if (props.network === "github") {
      return <Github />;
    } else if (props.network === "instagram") {
      return <Instagram />;
    } else if (props.network === "lastfm") {
      return <Headphones />;
    } else if (props.network === "linkedin") {
      return <Linkedin />;
    } else if (props.network === "twitch") {
      return <Twitch />;
    } else if (props.network === "twitter") {
      return <Twitter />;
    } else if (props.network === "youtube") {
      return <Youtube />;
    }
    return <HelpCircle />;
  };

  const title = () => {
    if (props.network === "email") {
      return "Email me";
    } else if (props.network === "blog") {
      return "My blog";
    } else if (props.network === "applemusic") {
      return "Apple Music";
    } else if (props.network === "cv") {
      return "My CV";
    }
    return `Find me on ${props.network}`;
  };

  const link = () => {
    if (props.network === "email") {
      return `mailto:${props.url}`;
    }
    return props.url;
  };

  return (
    <a
      className={`inline-table border-2 border-white rounded-lg p-3 h-6 w-6 socials ${props.network}`}
      href={link()}
      rel="noopener"
      target={props.network === "cv" ? "_blank" : ""}
      title={title()}
    >
      {icon()}
    </a>
  );
};

export default SocialMedia;
