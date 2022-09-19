import useSWR, { SWRConfig } from 'swr';
import { GraphQLClient, gql } from 'graphql-request';

import Image from 'next/future/image';
import Link from 'next/link';

import Layout from "../components/Layout";

import {employmentText} from '../utils/employment-text';
import ageText from '../utils/age-text';

import ProfilePicture from '../public/images/thomas.jpg';

const endpoint = 'https://api-tomo.uchuu.io/api/me';
const graphQLClient = new GraphQLClient(endpoint, {
  mode: 'cors',
  credentials: 'omit'
});
const fetcher = query => graphQLClient.request(query);

const query = gql`{
  personal {
    name
    birthday
    location
    based
    work {
      company
    }
  }
}`;

export async function getStaticProps() {
  const data = await fetcher(query);

  return {
    props: {
      fallback: {
        [query]: data
      }
    }
  };
};

// TODO: This page probably needs changing as it's too similar to resume now :thinking:
function Me() {
  const { data } = useSWR(query, fetcher);
  const { personal } = data;

  return (
    <Layout>
      <div className="container max-w-screen-md mx-auto text-lg text-justify mt-4 p-4 md:mt-12 md:p-0">
        <div className="mx-auto my-8 w-72">
          <Image src={ProfilePicture} alt={personal.name} className="rounded-full h-auto max-w-full" placeholder="blur" />
        </div>
        <section>
          <h1 className="sr-only">Thomas Moore</h1>
          <p>So hello there, I'm {personal.name}. I'm {ageText(personal.birthday)}, from {personal.location} and currently {employmentText(personal)}.</p>
          <p className="my-4">I'm a frontend developer with a focus on building components with javascript frameworks like reactjs & vuejs along with knowledge of a combination of most css solutions (css, scss, less, stylus, postcss, css in js). Storybook is ❤. I've also done a small small bit of backend work, either in javascript with node or php where I use laravel.</p>
          <p className="my-4">Outside of coding, I'm a big fan of things japanese but mostly enjoy music (and mostly <Link href="/idol"><a title="Oshimen list">IDOL</a></Link> at that) and aesthetics. I try to get over there every 2 years at least and I'm trying to learn the language via a tutor, self teaching and going to meetups.</p>
          <p className="my-4">I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry not sorry).</p>
        </section>
      </div>
    </Layout>
  )
};

export default function Page({ fallback }) {
  return (
    <SWRConfig value={{ fallback, refreshInterval: 21600 }}>
      <Me />
    </SWRConfig>
  )
};