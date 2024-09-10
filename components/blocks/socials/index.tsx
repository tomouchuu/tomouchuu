"use client";

import { Discord, Github, Instagram, Twitch, Twitter, Youtube } from "./icons";
import { Mail, Music, FileText, Headphones, HelpCircle } from "lucide-react";

import useSWR from "swr";
import { request } from "graphql-request";
import { Skeleton } from "../../ui/skeleton";

interface Props {
  network: string;
  url: string;
}

interface Data {
  personal: {
    contact: {
      [key: string]: string;
    };
  };
}

const fetcher = (query: string): Promise<Data> =>
  request(`${window.location.origin}/api/graphql`, query);

const SocialIcon = (props: Props) => {
  const icon = () => {
    if (props.network === "email") {
      return <Mail />;
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
      className={`inline-table border-2 border-accent rounded-lg p-3 h-6 w-6 socials ${props.network}`}
      href={link()}
      rel="noopener"
      target={props.network === "cv" ? "_blank" : ""}
      title={title()}
    >
      {icon()}
    </a>
  );
};

export default function Socials() {
  const { data, error, isLoading } = useSWR<Data>(
    `{
      personal {
        contact {
          email
          twitter
          github
          applemusic
          lastfm
          discord
          youtube
          twitch
          cv
        }
      }
    }`,
    fetcher,
  );

  if (data === undefined || isLoading || error)
    return (
      <div className="flex flex-row gap-2">
        <Skeleton className="h-[52px] w-full" />
      </div>
    );

  const socials = data.personal.contact;
  const socialMediaArrObj = [] as { network: string; url: string }[];
  Object.keys(socials).forEach((network) => {
    socialMediaArrObj.push({
      network: network,
      url: socials[network],
    });
  });

  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-4">
      {socialMediaArrObj.map((social) => (
        <SocialIcon
          key={social.network}
          network={social.network}
          url={social.url}
        />
      ))}
    </div>
  );
}
