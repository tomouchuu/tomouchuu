import SocialMedia from '../components/SocialMedia';

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
        <div className="container max-w-screen-md mx-auto bg-black bg-opacity-60 mb-8 sm:border sm:border-gray-50 sm:rounded text-3xl p-8 shadow-xl z-10">
            <div className="flex flex-wrap align-middle justify-around">
                <img className="rounded-full mr-8 w-52 h-52 border border-gray-50 flex-none" src={image} alt={name} />
                <div className="flex-1">
                    Hi I'm <h1 className="inline font-bold text-5xl">{name}</h1>, <b className="text-4xl">{birthday} years old</b>, from <b className="text-4xl">{location}</b><span dangerouslySetInnerHTML={{__html: based}} /> where I'm currently <span dangerouslySetInnerHTML={employment} />.
                </div>
            </div>
            <div className="mt-4 text-2xl">
                <p>Find me on:</p>
                <ul className="flex flex-row flex-wrap justify-center w-5/6 mt-2 mx-auto">
                    {socialMediaArr.map((social) =>
                        <li key={social.network} className="flex-initial m-2">
                            <SocialMedia network={social.network} url={social.url} scale="2x" />
                        </li>
                    )}
                </ul>
            </div>
            <p className="font-light mt-8">- トーマス＠宇宙 -</p>
        </div>
    );
}

export default Intro;