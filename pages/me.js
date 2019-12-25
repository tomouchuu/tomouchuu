import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';

import Base from '../components/Base';
import Container from '../components/Container';

import {employmentText} from '../utils/employment-text';
import ageText from '../utils/age-text';

const MeBase = styled(Base)`
    background: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.altText};
    font-size: ${props => props.theme.fontSizes[2]};
`;

Me.getInitialProps = async () => {
    const base = await fetch('https://api-tomo.uchuu.io/');
    const baseData = await base.json();

    const twitter = await fetch('https://api-tomo.uchuu.io/twitter/user.js');
    const twitterData = await twitter.json();

    return {baseData, twitterData};
}

function Me(props) {
    const {baseData: data, twitterData} = props;

    return (
        <MeBase>
            <Link href="/"><a>Back</a></Link>
            <Container>
                <img src={twitterData.profile_image_url_https.replace('_normal', '')} alt={data.me.name} style={{borderRadius: '50%', display: 'block', margin: '0 auto', width: '230px'}} />
                <p>So hello there, I'm {data.me.name}. I'm {ageText(data.me.birthday)}, from {data.me.location} and currently {employmentText(data.me)}.</p>
                <p>I'm a frontend developer with a focus on building components with javascript frameworks like reactjs & vuejs along with knowledge of a combination of most css solutions (css, scss, less, stylus, postcss, css in js). Storybook is ❤. I do also a little bit of backend work, eithern in javascript with node or php where I use laravel.</p>
                <p>Outside of coding, I'm a big fan of things japanese but mostly enjoy music (and mostly IDOL at that) and aesthetics. I try to get over there every 2 years at least and I'm trying to learn the language via a tutor, self teaching and going to meetups.</p>
                <p>I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry not sorry).</p>
            </Container>
        </MeBase>
    )
};

export default Me;