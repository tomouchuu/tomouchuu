import useSWR from 'swr';
import Link from 'next/link';

import employmentMarkup from '../utils/employment-text';
import ageText from '../utils/age-text';

import Base from '../components/Base';
import Intro from '../components/Intro';
import CurrentMusic from '../components/CurrentMusic';
import CurrentTweet from '../components/CurrentTweet';
import LastGithub from '../components/LastGithub';

const fetcher = url => fetch(url).then(r => r.json());

export async function getStaticProps() {
    const baseData = await fetcher('https://api-tomo.uchuu.io/');
    const twitterData = await fetcher('https://api-tomo.uchuu.io/twitter/user.js');
    const githubData = await fetcher('https://api-tomo.uchuu.io/github');
    const lastfmData = await fetcher('https://api-tomo.uchuu.io/lastfm');

    return {
        props: {
            baseData, githubData, twitterData, lastfmData
        }
    };
};

const Home = (props) => {
    const { data } = useSWR('https://api-tomo.uchuu.io/', fetcher, { initialData: props.baseData });
    const { data: twitterData } = useSWR('https://api-tomo.uchuu.io/twitter/user.js', fetcher, { initialData: props.twitterData });
    const { data: githubData } = useSWR('https://api-tomo.uchuu.io/github', fetcher, { initialData: props.githubData });
    const { data: lastfmData } = useSWR('https://api-tomo.uchuu.io/lastfm', fetcher, {initialData: props.lastfmData});
    
    const basedInText = data.me.based ? ` and working in <b>${data.me.based}</b>` : '';

    return (
        <Base>
            <div>
                <Intro
                    based={basedInText}
                    birthday={ageText(data.me.birthday)}
                    contact={data.me.contact}
                    employment={employmentMarkup(data.me)}
                    image={twitterData?.profile_image_url_https.replace('_normal', '')}
                    location={data.me.location}
                    name={data.me.name}
                />
                <div className="px-4 mb-8 md:px-2">
                    <CurrentMusic music={lastfmData} />
                    <CurrentTweet tweet={twitterData} />
                    <LastGithub data={githubData[0]} />
                    <p className="mt-4 text-2xl">
                        <Link href="/me"><a>More about me</a></Link>
                    </p>
                </div>
            </div>
        </Base>
    )
};

export default Home;