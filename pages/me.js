import useSWR from 'swr';
import { GraphQLClient, gql } from 'graphql-request';

import Link from 'next/link';

import {employmentText} from '../utils/employment-text';
import ageText from '../utils/age-text';

const endpoint = 'https://api-tomo.uchuu.io/api/me';
const graphQLClient = new GraphQLClient(endpoint, {
    mode: 'cors',
    credentials: 'omit'
});
const fetcher = query => graphQLClient.request(query);

export async function getStaticProps() {
    const data = await fetcher(gql`{
        personal {
            name
            birthday
            location
            based
            work {
                company
            }
        }
        twitter {
            user {
                profile_image_url_https
            }
        }
    }`);

    return {
        props: {
            data
        },
        revalidate: 21600 //6hours
    };
}

function Me(props) {
    const {personal, twitter: {user: twitterData}} = props.data;

    return (
        <div className="container max-w-screen-md mx-auto text-lg text-justify mt-4 p-4 md:mt-12 md:p-0">
            <Link href="/"><a className="text-2xl">Back</a></Link>
            <img src={twitterData.profile_image_url_https} alt={personal.name} className="block rounded-full mx-auto my-8 w-72" />
            <p>So hello there, I'm {personal.name}. I'm {ageText(personal.birthday)}, from {personal.location} and currently {employmentText(personal)}.</p>
            <p className="my-8">I'm a frontend developer with a focus on building components with javascript frameworks like reactjs & vuejs along with knowledge of a combination of most css solutions (css, scss, less, stylus, postcss, css in js). Storybook is ❤. I do also a little bit of backend work, either in javascript with node or php where I use laravel.</p>
            <p className="my-8">Outside of coding, I'm a big fan of things japanese but mostly enjoy music (and mostly <Link href="/idol"><a title="Oshimen list">IDOL</a></Link> at that) and aesthetics. I try to get over there every 2 years at least and I'm trying to learn the language via a tutor, self teaching and going to meetups.</p>
            <p className="my-8">I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry not sorry).</p>
        </div>
    )
};

export default Me;