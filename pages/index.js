import useSWR from 'swr';
import { GraphQLClient, gql } from 'graphql-request';

import Link from 'next/link';

import employmentMarkup from '../utils/employment-text';
import ageText from '../utils/age-text';

import Base from '../components/Base';
import Intro from '../components/Intro';
import CurrentMusic from '../components/CurrentMusic';
import CurrentTweet from '../components/CurrentTweet';
import LastGithub from '../components/LastGithub';

// const endpoint = 'https://api-tomo.uchuu.io/api/me';
const endpoint = 'http://localhost:3000/api/me'; //VERY DUMB
const graphQLClient = new GraphQLClient(endpoint, {
    mode: 'cors',
    credentials: 'omit'
});
const fetcher = query => graphQLClient.request(query)

const query = gql`{
	personal {
        name
        birthday
        location
        based
        contact {
            email
            twitter
            github
            applemusic
            lastfm
            discord
            youtube
            twitch
            linkedin
        }
        work {
            company
        }
    }
    music {
        album {
            name
            url
        }
        artist {
            name
            url
        }
        track {
            name
            url
            playedCount
        }
    }
    github(limit: 1) {
        payload {
            action
            issue {
                number
            }
            ref
            ref_type
        }
        repo {
            name
        }
        type
    }
    twitter {
        user {
            profile_image_url_https
            status {
                created_at
                id_str
                full_text
            }
        }
    }
}`;

export async function getStaticProps() {
    const data = await fetcher(query);

    return {
        props: {
            data
        },
        revalidate: 21600 //6hours
    };
};

const Home = (props) => {
    const { data } = useSWR(query, fetcher, { initialData: props.data });
    const {personal, github: lastGithub, music, twitter: {user: twitterData}} = data;
    
    const basedInText = personal.based ? ` and working in <b>${personal.based}</b>` : '';

    return (
        <Base>
            <div>
                <Intro
                    based={basedInText}
                    birthday={ageText(personal.birthday)}
                    contact={personal.contact}
                    employment={employmentMarkup(personal)}
                    image={twitterData.profile_image_url_https}
                    location={personal.location}
                    name={personal.name}
                />
                <div className="px-4 mb-8 md:px-2">
                    <CurrentMusic music={music} />
                    <CurrentTweet tweet={twitterData} />
                    <LastGithub data={lastGithub[0]} />
                    <p className="mt-4 text-2xl">
                        <Link href="/me"><a>More about me</a></Link>
                    </p>
                </div>
            </div>
        </Base>
    )
};

export default Home;