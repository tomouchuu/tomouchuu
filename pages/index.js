import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import employmentMarkup from '../utils/employment-text';
import ageText from '../utils/age-text';

import Base from '../components/Base';
import Intro from '../components/Intro';
import CurrentText from '../components/CurrentText';
import CurrentMusic from '../components/CurrentMusic';
import CurrentTweet from '../components/CurrentTweet';
import LastGithub from '../components/LastGithub';

Home.getInitialProps = async () => {
    const base = await fetch('https://api-tomo.uchuu.io/');
    const baseData = await base.json();

    const twitter = await fetch('https://api-tomo.uchuu.io/twitter/user.js');
    const twitterData = await twitter.json();

    const github = await fetch('https://api-tomo.uchuu.io/github');
    const githubData = await github.json();

    const lastfm = await fetch('https://api-tomo.uchuu.io/lastfm');
    const lastfmData = await lastfm.json();

    baseData.music = lastfmData;

    return {baseData, githubData, twitterData};
}

function Home(props) {
    const {baseData: data, githubData, twitterData} = props;

    const basedInText = data.me.based ? ` and working in <b>${data.me.based}</b>` : false;

    return (
        <Base>
            <Intro
                based={basedInText}
                birthday={ageText(data.me.birthday)}
                contact={data.me.contact}
                employment={employmentMarkup(data.me)}
                image={twitterData.profile_image_url_https.replace('_normal', '')}
                location={data.me.location}
                name={data.me.name}
            />
            <CurrentMusic music={data.music} />
            <CurrentTweet tweet={twitterData} />
            <LastGithub data={githubData[0]} />
            <CurrentText>
                <Link href="/me"><a>More about me</a></Link>
            </CurrentText>
        </Base>
    )
};

export default Home;