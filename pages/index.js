import fetch from 'isomorphic-unfetch';
import {differenceInYears, parse} from 'date-fns';

import Base from '../components/Base';
import Intro from '../components/Intro';
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

function employment(meData) {
    let markup = `working at <b>${meData.work[0].company}</b>`;
    if (meData.work[0].company === 'unemployed') {
        markup = `<span>looking for work, <a href="mailto:${meData.contact.email}" class="looking-for">get in touch</a></span>`;
    }
    return {__html: markup};
}

function age(birthday) {
    const now = new Date();
    const parsedBirthday = parse(birthday, 'yyyy-MM-dd', now);
    return differenceInYears(now, parsedBirthday);
}

function Home(props) {
    const {baseData: data, githubData, twitterData} = props;

    const basedInText = data.me.based ? ` and working in <b>${data.me.based}</b>` : false;

    return (
        <Base>
            <Intro
                based={basedInText}
                birthday={age(data.me.birthday)}
                contact={data.me.contact}
                employment={employment(data.me)}
                image={twitterData.profile_image_url_https.replace('_normal', '')}
                location={data.me.location}
                name={data.me.name}
            />
            <CurrentMusic music={data.music} />
            <CurrentTweet tweet={twitterData} />
            <LastGithub data={githubData[0]} />
        </Base>
    )
};

export default Home;