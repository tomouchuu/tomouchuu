import { api } from "~/lib/api";

export const personalQueryOpts = () => ({
  queryKey: ["personalData"],
  queryFn: async () => {
    try {
      return await api.personal.data.query();
    } catch (error) {
      console.error(error);
    }
  },
  staleTime: 1000 * 60 * 60 * 24, // 1 day
  throwOnError: false,
  placeholderData: {
    name: "Thomas Moore",
    birthday: "1993-09-14",
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
    projects: [],
    skills: [],
    work: [],
  },
});
