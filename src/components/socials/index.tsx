import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Skeleton } from "~/components/ui/skeleton";

import { FileText, Headphones, Mail, Music } from "~/components/icons";
import { Discord, Github, Instagram, Twitch, Twitter, Youtube } from "./icons";
import "./socials.css";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { Linkedin } from "./icons/linkedin";

type ContactInfo = inferRouterOutputs<AppRouter>["personal"]["data"]["contact"];

export function SocialsLoading() {
  return (
    <div class="flex justify-center items-center my-2 text-lg w-full">
      <Skeleton class="h-8 rounded-lg flex-grow" style={{ height: "" }} />
    </div>
  );
}

const socialIcons = {
  applemusic: Music,
  cv: FileText,
  discord: Discord,
  email: Mail,
  github: Github,
  instagram: Instagram,
  lastfm: Headphones,
  linkedin: Linkedin,
  twitch: Twitch,
  twitter: Twitter,
  youtube: Youtube,
};
type SocialIcon = keyof typeof socialIcons;

export function Socials({ data }: { data?: ContactInfo }) {
  if (data === undefined) return;

  return (
    <div class="flex flex-row flex-wrap justify-center items-center gap-4">
      <For each={Object.keys(data)}>
        {(social) => {
          const socialIcon = social as SocialIcon;
          let href = data[socialIcon];
          let title = `Find me on ${social}`;

          switch (socialIcon) {
            case "applemusic":
              title = `Apple Music`;
              break;

            case "cv":
              title = `My CV`;
              break;

            case "email":
              href = `mailto:${data[socialIcon]}`;
              title = `Email me`;
              break;

            default:
              break;
          }

          return (
            <a
              class={`inline-table border-2 border-accent rounded-lg p-3 socials ${social}`}
              href={href}
              rel="noopener"
              target={social === "cv" ? "_blank" : ""}
              title={title}
            >
              <Dynamic component={socialIcons[socialIcon]} />
            </a>
          );
        }}
      </For>
    </div>
  );
}

export default Socials;
