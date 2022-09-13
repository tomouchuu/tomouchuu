import Link from 'next/link';
import Image from 'next/future/image';

import SayuchaImg from '../public/images/idols/sayucha.jpg';
import YuiponImg from '../public/images/idols/yuipon.jpg';
import AoImg from '../public/images/idols/ao.jpg';
import RisanoImg from '../public/images/idols/risano.jpg';
import MirinImg from '../public/images/idols/mirin.jpg';

const Idol = ({imgSrc, imgAlt, colour, name, jpName, group, blurb, twitterUrl}) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-8 p-4 border-2 rounded shadow-lg" style={{borderColor: colour}}>
    <div className="md:col-span-4 mb-4 md:mb-0">
      <a href={twitterUrl} title={`Follow ${name} on Twitter`}>
        <Image src={imgSrc} alt={imgAlt} className="rounded-2xl h-auto max-w-full" placeholder="blur" />
      </a>
    </div>
    <div className="md:col-span-8">
      <p className="text-3xl">{name}</p>
      {jpName && <p className="font-light text-xl">{jpName}</p>}
      <p className="text-lg">{group}</p>
      <hr className="w-1/2 mx-auto my-3" />
      <p>{blurb}</p>
    </div>
  </div>
);

const IdolPage = () => {
  return (
    <div className="dark:bg-neutral-900 dark:text-white">
      <div className="container md:max-w-screen-md mx-auto text-lg p-4 md:py-6 md:px-0">
        <Link href="/"><a className="text-xl">Back</a></Link>
        <h1 className="my-4 text-6xl text-center">Oshimen List</h1>
        <Idol
          imgSrc={SayuchaImg}
          imgAlt="Sayucha"
          colour="#1fb8d3"
          name="Sayuri Kiuchi (Sayucha)"
          jpName="木内小百合 (さゆちゃ)"
          group="Papipupepo wa muzukashii - パピプペポは難しい"
          blurb="I went to see another group but was absolutely entranced by Sayucha and Papimuzu. She was in a maid outfit (turns out it was a cosplay show) and she knew a little bit of english so we could chat while taking chekis. Being a chika idol, we developed a great relationship over twitter while I was back home and fuels the desire to go back and see her whenever I can. She can also play the guitar and always wants to know what I'm up to."
          twitterUrl="https://twitter.com/sayuri_ppppphm"
        />
        <Idol
          imgSrc={YuiponImg}
          imgAlt="Yuipon"
          colour="#b91d29"
          name="Shirahane Yui (Yuipon)"
          jpName="白羽根優衣 (ゆいぽん)"
          group="Papipupepo wa muzukashii - パピプペポは難しい"
          blurb="As papimuzu is a smaller group, you will always end up interacting with the other members. For yuipon I would tune into her Pococha streams and became more interested in her twitter. Now we play Lords Mobile together (leftover from a collaboration competition). She is a really relatable idol, not afraid to chat about negatives, her part time job and I want to make her happy."
          twitterUrl="https://twitter.com/yui_ppppphm"
        />
        <Idol
          imgSrc={AoImg}
          imgAlt="Ao"
          colour="#76c2ef"
          name="Yamato Ao"
          jpName="大和明桜"
          group="Niji no conquistador - 虹のコンキスタドール"
          blurb="Ao is always super interesting and loves to learn about the world. It's all so fascinating to her. She is trying her hardest at learning english to make talking easier and other skills since she is doing her best to stand out from a stacked idol group. We first met in France so it's a running joke that I'm french. It's always a fun time talking to her."
          twitterUrl="https://twitter.com/yamato__ao"
        />
        <hr className="w-3/4 mx-auto my-3" />
        <Idol
          imgSrc={RisanoImg}
          imgAlt="Risano"
          colour="#f37f34"
          name="Risano"
          jpName=""
          group="Lyrical School - リリカルスクール"
          blurb="With risano spending a bunch of time in LA, her english is great and it's fantastic to talk to her. I admit it's not as much as I should for all she has done for me but it's been a ton of fun. Highlight was when I got a ticket for one of Lyrical School's shows and she shouted me out at the end in like a 1000 capacity venue."
          twitterUrl="https://twitter.com/risano_0928"
        />
        <Idol
          imgSrc={MirinImg}
          imgAlt="Mirin"
          colour="#d62215"
          name="Furukawa Mirin"
          jpName="古川未鈴"
          group="Dempagumi.inc - でんぱ組.inc"
          blurb="Mirin was my first idol that I would do anything for. I've been blessed because of that mindset to be able to see them many times (including 3 times at Budoukan) and met tonnes of friends because of her."
          twitterUrl="https://twitter.com/FurukawaMirin"
        />
      </div>
    </div>
  )
};

export default IdolPage;
