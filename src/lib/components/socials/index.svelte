<style>
  .socials {
    background-color: transparent;
    transition:
      background-color 0.7s,
      color 0.7s;
  }
  .socials:hover {
    color: hsl(var(--social-white)) !important;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .socials.twitter {
    color: #55acee;
  }
  .socials.twitter:hover {
    background-color: #55acee;
  }

  .socials.instagram {
    color: #3f729b;
  }
  .socials.instagram:hover {
    background-color: #3f729b;
  }

  .socials.discord {
    color: #7289da;
  }
  .socials.discord:hover {
    background-color: #7289da;
  }

  .socials.email {
    color: #ff4136;
  }
  .socials.email:hover {
    background-color: #ff4136;
  }

  .socials.youtube {
    color: #ff0000;
  }
  .socials.youtube:hover {
    background-color: #ff0000;
  }

  .socials.twitch {
    color: #6441a5;
  }
  .socials.twitch:hover {
    background-color: #6441a5;
  }

  .socials.linkedin {
    color: #0077b5;
  }
  .socials.linkedin:hover {
    background-color: #0077b5;
  }

  .socials.lastfm {
    color: #d51007;
  }
  .socials.lastfm:hover {
    background-color: #d51007;
  }

  .socials.applemusic {
    color: #ff2f56;
  }
  .socials.applemusic:hover {
    background-color: #ff2f56;
  }

  .socials.cv,
  .socials.github {
    color: var(--foreground);
  }
  .socials.cv:hover,
  .socials.github:hover {
    background-color: var(--foreground);
    color: var(--background) !important;
  }
</style>

<script lang="ts">
  import FileTextIcon from '@lucide/svelte/icons/file-text';
  import HeadphonesIcon from '@lucide/svelte/icons/headphones';
  import MailIcon from '@lucide/svelte/icons/mail';
  import MusicIcon from '@lucide/svelte/icons/music';
  import * as Icons from './icons/index.js';

  let { socials } = $props();
  let socialArray = Object.keys(socials).map((key) => {
    const name = key;
    let href = socials[key];
    let title = `Find me on ${name}`;

    switch (name) {
      case "applemusic":
        title = "Apple Music";
        break;

      case "cv":
        title = "My CV";
        break;

      case "email":
        href = `mailto:${socials[key]}`;
        title = "Email me";
        break;

      default:
        break;
    }

    const iconName = name.charAt(0).toUpperCase() + name.slice(1) as keyof typeof Icons;
    let Icon = (Icons[iconName] as any) || null;

    if (Icon === null) {
      switch (name) {
        case "cv":
          Icon = FileTextIcon;
          break;
        case "email":
          Icon = MailIcon;
          break;
        case "lastfm":
          Icon = HeadphonesIcon;
          break;
        case "applemusic":
          Icon = MusicIcon;
          break;
        default:
          Icon = null;
      }
    }

    return {
      name,
      href,
      title,
      Icon
    }
  });
</script>

<div class="flex flex-row flex-wrap justify-center items-center gap-4">
  {#each socialArray as social}
    <a
      class={`inline-table border-2 border-accent rounded-lg p-3 socials ${social.name.toLowerCase()}`}
      href={social.href}
      rel="noopener noreferrer"
      target={social.name === "cv" ? "_blank" : undefined}
      title={social.title}
    >
      {#if social.Icon}
        <social.Icon class="size-6" />
      {:else}
        {social.name}
      {/if}
    </a>
  {/each}
</div>
