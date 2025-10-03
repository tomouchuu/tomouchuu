import { Elysia } from "elysia";

export const personal = new Elysia({ prefix: "/personal" }).get("/", () => ({
  name: "Thomas Moore",
  location: "Chelmsford",
  based: "my home office",
  contact: {
    email: "thomas.moore@hey.com",
    twitter: "https://www.twitter.com/tomouchuu",
    github: "https://github.com/tomouchuu",
    instagram: "https://instagram.com/tomouchuu",
    applemusic: "https://itunes.apple.com/profile/tomouchuu",
    lastfm: "https://www.last.fm/user/TminatorT",
    discord: "discord:tomouchuu",
    youtube: "https://www.youtube.com/channel/UCl8LE1A9XI5gE_VD47hl8Cg",
    twitch: "https://www.twitch.tv/tomouchuu",
    linkedin: "https://www.linkedin.com/in/thomas-moore-730226121/",
    cv: "https://tomo.uchuu.io/thomas-moore-resume.pdf",
  },
  work: [
    {
      company: "Web Security",
      date: "March 2022 - Current",
      description: "",
      title: "UI Engineer",
      url: "#",
    },
    {
      company: "Essex County Council",
      date: "November 2020 - Feburary 2022",
      description:
        "Working within the Product team of Service Transformation with the aim to build and use new tools to change the way the council operates to be better for staff and residents.",
      title: "Frontend Web Developer",
      url: "https://www.essex.gov.uk",
    },
    {
      company: "reed.co.uk",
      date: "September 2016 - November 2020",
      description:
        "Originally a junior full-stack developer but have since transitioned into a frontend only role. At work we use Razor & Knockout for legacy code but we are moving to react for new projects.",
      title: "Software Development Engineer",
      url: "https://www.reed.co.uk",
    },
    {
      company: "Ahead4",
      date: "May 2012 - September 2016",
      description:
        "I handled a lot of the front end tasks such as slicing sites and some back end tasks using PHP and MySQL to integrate designs into our custom CMS, Wordpress or a bespoke control panel depending on the client.",
      title: "Web Developer",
      url: "https://www.ahead4.co.uk",
    },
    {
      company: "Progressive Marketing / DB Training",
      date: "September 2011 - May 2012",
      description:
        "As an apprentice, I was learning key skills to build websites from a Designer's PSDs to create a static website for projects. I wasn't on any customer projects but was able to compare my work to the other apprentices in the class and consistenly ranked in the top 3.",
      title: "Apprentice Web Developer",
      url: "",
    },
  ],
}));
