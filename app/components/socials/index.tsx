"use client";

import React from "react";
import { FileText, Headphones, Mail, Music } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Discord,
  Github,
  Instagram,
  Linkedin,
  Twitch,
  Twitter,
  Youtube,
} from "./icons";
import "./socials.css";
import { treaty } from "@elysiajs/eden";
import type { App } from "@/api/[[...slugs]]/route";
import { getBaseUrl } from "@/lib/url";

type ContactInfo = Record<string, string | undefined>;

const app = treaty<App>(getBaseUrl());

export function SocialsLoading() {
  return (
    <div className="flex justify-center items-center my-2 text-lg w-full">
      <Skeleton className="h-8 rounded-lg flex-grow" style={{ height: "" }} />
    </div>
  );
}

const socialIcons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
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

function SocialIcons({ data }: { data?: ContactInfo }) {
  if (!data) return <SocialsLoading />;

  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-4">
      {Object.keys(data).map((social) => {
        const socialIconKey = social as keyof typeof socialIcons;
        const Icon = socialIcons[socialIconKey];
        let href = data[socialIconKey] ?? "#";
        let title = `Find me on ${social}`;

        switch (socialIconKey) {
          case "applemusic":
            title = "Apple Music";
            break;

          case "cv":
            title = "My CV";
            break;

          case "email":
            href = `mailto:${data[socialIconKey]}`;
            title = "Email me";
            break;

          default:
            break;
        }

        return (
          <a
            key={social}
            className={`inline-table border-2 border-accent rounded-lg p-3 socials ${social}`}
            href={href}
            rel="noopener noreferrer"
            target={social === "cv" ? "_blank" : undefined}
            title={title}
          >
            {Icon ? <Icon /> : null}
          </a>
        );
      })}
    </div>
  );
}

export function Socials() {
  const [data, setData] = React.useState<ContactInfo | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = (await app.api.personal.get()) as {
          data?: { contact?: ContactInfo };
        };
        const personal = resp?.data;
        const contact = (personal?.contact ?? null) as ContactInfo | null;
        if (!cancelled) setData(contact);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || error || !data) return <SocialsLoading />;
  return <SocialIcons data={data} />;
}

export default Socials;
