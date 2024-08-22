import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';

import GithubApi from './github';
import LastFMApi from './lastfm';
import personal from './personal';

import { NextRequest } from 'next/server';

const typeDefs = gql`
  type LastFmMusicInfo {
    url: String!
    name: String!
    image: String
    playedCount: Int!
  }

  type RecentlyPlayed {
    track: LastFmMusicInfo!
    artist: LastFmMusicInfo!
    album: LastFmMusicInfo!
    isLive: String
  }

  type GithubRepo {
    name: String
  }

  type GithubIssue {
    number: String
  }

  type GithubPayload {
    action: String
    issue: GithubIssue
    ref: String
    ref_type: String
  }

  type GithubEvent {
    payload: GithubPayload
    repo: GithubRepo
    type: String
  }

  type Contact {
    email: String!
    twitter: String!
    github: String!
    instagram: String
    applemusic: String
    lastfm: String
    discord: String
    youtube: String
    twitch: String
    linkedin: String
    cv: String
  }

  type Project {
    name: String
    description: String
    url: String!
  }

  type Work {
    company: String
    date: String
    description: String
    title: String
    url: String!
  }

  type Personal {
    name: String!
    birthday: String!
    location: String!
    based: String
    contact: Contact!
    skills: [String]!
    projects: [Project]!
    work: [Work]!
  }

  type Query {
    github(limit: Int): [GithubEvent]
    music: RecentlyPlayed
    personal: Personal!
  }
`;

const resolvers = {
  Query: {
    github: () => {
      const githubApi = new GithubApi();
      return githubApi.getEvents();
    },
    music: () => {
      const lastFmAPI = new LastFMApi();
      return lastFmAPI.formatLatestTrack();
    },
    personal: () => personal,
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  enablePlayground: true,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: NextRequest) => ({ req }),
});

export { handler as GET, handler as POST };