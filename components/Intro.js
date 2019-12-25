import styled from 'styled-components';

import Container from './Container';
import SocialMedia from './SocialMedia';

const IntroContainer = styled(Container)`
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid ${props => props.theme.colors.text};
    line-height: ${props => props.theme.lineHeights.intro};
    border-radius: ${props => props.theme.borderRadius[0]};
`;

const IntroContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    h1 {
        display: inline;
        font-size: ${props => props.theme.fontSizes[4]};
    }

    b {
        font-size: ${props => props.theme.fontSizes[3]};
    }

    img ~ div {
        flex: 0 1 auto;
    }

    a.looking-for {
        color: #ddd;
        text-decoration: none;
        &:hover {
            color: ${props => props.theme.colors.text};
            text-decoration: underline;
        }
    }

    @media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
        flex-wrap: wrap;
    }
`;

const ProfileImg = styled.img`
    border-radius: ${props => props.theme.borderRadius[1]};
    border: 1px solid ${props => props.theme.colors.text};
    flex: 0 1 auto;
    margin-right: ${props => props.theme.spacings[3]};
    width: 170px;

    @media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
        float: none;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: ${props => props.theme.spacings[3]};
    }
`;

const SocialList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin: -${props => props.theme.spacings[1]} 0 0;
    text-align: center;
    line-height: ${props => props.theme.lineHeights.socials};
    & li {
        display: inline-block;
    }
`;

const Signature = styled.p`
    font-size: ${props => props.theme.fontSizes[1]};
    font-weight:  ${props => props.theme.fontWeights.light};
    margin: 0;
    text-align: center;
`;

const Intro = props => {
    const {based, birthday, contact, employment, image, location, name} = props;

    const socialMediaArr = [];
    Object.keys(contact).forEach(network => {
        socialMediaArr.push({
            network: network,
            url: contact[network],
        });
    });

    return (
        <IntroContainer>
            <IntroContent>
                <ProfileImg src={image} alt={name} />
                <div>
                    Hi I'm <h1>{name}</h1>, <b>{birthday} years old</b>, from <b>{location}</b><span dangerouslySetInnerHTML={{__html: based}} /> where I'm currently <span dangerouslySetInnerHTML={employment} />.
                </div>
            </IntroContent>
            <div className="socials">
                <p style={{'fontSize': '1.2rem'}}>Find me on:</p>
                <SocialList>
                    {socialMediaArr.map((social) =>
                        <li key={social.network}><SocialMedia network={social.network} url={social.url} scale="3x" /></li>
                    )}
                </SocialList>
            </div>
            <Signature>- トーマス＠宇宙 -</Signature>
        </IntroContainer>
    );
}

export default Intro;