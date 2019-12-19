import styled from 'styled-components';
import SocialMedia from './SocialMedia';

const IntroContainer = styled.div`
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid #fff;
    border-radius: 4px;
    color: #fff;
    line-height: 40px;
    margin: 0 auto;
    padding: 30px;
    width: 550px;
    z-index: 10;

    @media screen and (max-width:  620px) {
        box-sizing: border-box;
        width: 100%;
    }
`;

const IntroContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    h1 {
        display: inline;
        font-size: 2.75rem;
    }

    b {
        font-size: 2rem;
    }

    img ~ div {
        flex: 0 1 auto;
    }

    a.looking-for {
        color: #ddd;
        text-decoration: none;
        &:hover {
            color: #fff;
            text-decoration: underline;
        }
    }

    @media screen and (max-width:  620px) {
        flex-wrap: wrap;
    }
`;

const ProfileImg = styled.img`
    border-radius: 50%;
    border: 1px solid #fff;
    flex: 0 1 auto;
    margin-right: 30px;
    width: 170px;

    @media screen and (max-width:  620px) {
        float: none;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 30px;
    }
`;

const SocialList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin: -15px 0 0;
    text-align: center;
    & li {
        display: inline-block;
    }
`;

const Signature = styled.p`
    font-size: 1rem;
    font-weight: light;
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