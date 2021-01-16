import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import {employmentText} from '../utils/employment-text';
import ageText from '../utils/age-text';

export async function getStaticProps() {
    const base = await fetch('https://api-tomo.uchuu.io/');
    const baseData = await base.json();

    const twitter = await fetch('https://api-tomo.uchuu.io/twitter/user.js');
    const twitterData = await twitter.json();

    return {
        props: {
            baseData, twitterData
        }
    };
}

function Me(props) {
    const {baseData: data, twitterData} = props;

    return (
        <div className="container max-w-screen-md mx-auto text-lg text-justify mt-4 p-4 md:mt-12 md:p-0">
            <Link href="/"><a className="text-2xl">Back</a></Link>
            <img src={twitterData.profile_image_url_https.replace('_normal', '')} alt={data.me.name} className="block rounded-full mx-auto my-8 w-72" />
            <p>So hello there, I'm {data.me.name}. I'm {ageText(data.me.birthday)}, from {data.me.location} and currently {employmentText(data.me)}.</p>
            <p className="my-8">I'm a frontend developer with a focus on building components with javascript frameworks like reactjs & vuejs along with knowledge of a combination of most css solutions (css, scss, less, stylus, postcss, css in js). Storybook is ❤. I do also a little bit of backend work, either in javascript with node or php where I use laravel.</p>
            <p className="my-8">Outside of coding, I'm a big fan of things japanese but mostly enjoy music (and mostly IDOL at that) and aesthetics. I try to get over there every 2 years at least and I'm trying to learn the language via a tutor, self teaching and going to meetups.</p>
            <p className="my-8">I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry not sorry).</p>
        </div>
    )
};

export default Me;