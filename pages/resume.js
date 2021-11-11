import { useState } from 'react';
import useSWR from 'swr';
import { GraphQLClient, gql } from 'graphql-request';

import Link from 'next/link';

import {employmentText} from '../utils/employment-text';
import ageText from '../utils/age-text';

const endpoint = 'https://api-tomo.uchuu.io/api/me';
const graphQLClient = new GraphQLClient(endpoint, {
    mode: 'cors',
    credentials: 'omit'
});
const fetcher = query => graphQLClient.request(query);

const query = gql`{
	personal {
        name
        birthday
        location
        based
        contact {
            email
            github
            linkedin
        }
        projects {
            description
            name
            url
        }
        skills
        work {
            company
            date
            description
            title
            url
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

const Divider = () => <hr className="my-8 mx-auto max-w-lg border-gray-300" />
const SectionTitle = ({children}) => <h3 className="inline-block text-3xl underline">{children}</h3>

// NOTE:
// To generate a PDF you'll want to go to this page in a dev env then you'll want to click the download as pdf button and from there use chrome's print to save it as a pdf.
function Resume(props) {
    const [local] = useState(process.env.NODE_ENV === 'development');
    const [isPDF, setIsPDF] = useState(false);
    const { data } = useSWR(query, fetcher, { initialData: props.data });
    const {personal} = data;

    function toggleIsPDF() {
        if (local) {
            setIsPDF(!isPDF);
        } else {
            window.location.href = '/thomas-moore-resume.pdf';
        }
    }

    return (
        <>
            {!local && (
                <Link href="/"><a className="text-2xl">Back</a></Link>
            )}

            <div className={`container max-w-screen-lg mx-auto my-4 p-4 md:mt-12 md:p-0 ${isPDF ? 'text-base' : 'text-lg'}`}>
                <section>
                    <div className="flex items-baseline">
                        <h1 className="text-5xl">{personal.name}</h1>
                        <h2 className="text-2xl ml-4">aka. Tom, Tomo <small className="text-sm">He/Him</small></h2>
                    </div>
                    {!isPDF ? (
                        <ul className="mt-4 flex justify-between text-center">
                            <li className="flex-1">{personal.location}</li>
                            <li className="flex-1 border-l border-gray-300 px-3"><a href={`mailto:${personal.contact.email}`} title={personal.contact.email}>Email</a></li>
                            <li className="flex-1 border-l border-gray-300 px-3"><a href={personal.contact.linkedin} title={personal.contact.linkedin}>Linkedin</a></li>
                            <li className="flex-1 border-l border-gray-300"><a href={personal.contact.github} title={personal.contact.github}>Github</a></li>
                        </ul>
                    ) : (
                        <ul className="mt-4">
                            <li>{personal.location}</li>
                            <li>{personal.contact.email}</li>
                            <li>{personal.contact.linkedin}</li>
                            <li>{personal.contact.github}</li>
                        </ul>
                    )}
                </section>

                <Divider />

                <section className="text-justify">
                    <p>So hello there, I'm {personal.name}. I'm {ageText(personal.birthday)}, from {personal.location} and currently {employmentText(personal)}.</p>
                    <p className="my-8">I'm a frontend developer with a focus on building components with js libraries like reactjs (preferred) & vuejs in frameworks like NextJS + Gatsby along with a combination of most css solutions (css, scss, less, stylus, postcss, css in js, tailwind). Storybook is ❤.</p>
                    <p className="my-4">I've also done a bit of backend work in javascript with node aswell as having used PHP and Laravel in the past.</p>
                    <p className="my-8">Outside of coding, I'm a big fan of things japanese but mostly enjoy music (and mostly <Link href="/idol"><a title="Oshimen list">IDOL</a></Link> at that) and aesthetics. I used to try to get over there at least once a year and I'm trying to learn the language via a tutor, self teaching and going to meetups.</p>
                    <p className="my-8">Gamewise most of my time is taken up playing the critically acclaimed Final Fantasy 14 which has an unlimited free trial up to level 60 that includes the award winning Heavensward expansion. I mostly play ranged support roles and have ranked as the best in role at a given fight in Europe.</p>
                    <p className="my-8">I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry not sorry).</p>
                </section>

                <Divider />

                <section>
                    <SectionTitle>Experience</SectionTitle>
                    {personal.work.map(work => (
                        <section key={work.date} className="grid grid-cols-12 gap-4 my-6">
                            <div className="col-span-5">
                                <p className="font-bold">{work.title}</p>
                                {work.url !== "" ? (
                                    <>
                                        {isPDF ? (
                                            <>
                                                <p>{work.company}</p>
                                                <p>{work.url}</p>
                                            </>
                                        ) : (
                                            <a href={work.url}>{work.company}</a>
                                        )}
                                    </>
                                ) : (
                                    <p>{work.company}</p>
                                )}
                                <p>{work.date}</p>
                            </div>
                            <p className="col-span-7">{work.description}</p>
                        </section>
                    ))}
                </section>

                <Divider />

                <section>
                    <SectionTitle>Projects</SectionTitle>
                    {personal.projects.map(project => (
                        <section key={project.name} className="my-6">
                            {isPDF ? (
                                <div>
                                    <p className="font-bold">{project.name}</p> 
                                    <p>{project.url}</p>
                                </div>
                            ) : (
                                <div className="flex justify-between items-baseline mb-2">
                                    <p className="font-bold">{project.name}</p>
                                    {project.url && (
                                        <a href={project.url} className="text-sm">More information</a>
                                    )}
                                </div>
                            )}
                            <p>
                                {project.description}
                            </p>
                        </section>
                    ))}
                </section>

                <Divider />

                <section>
                    <SectionTitle>Skills</SectionTitle>
                    <ul className="grid grid-cols-4 gap-4 text-center mt-4">
                        {personal.skills.map(skill => (
                            <li key={skill}>{skill}</li>
                        ))}
                    </ul>
                </section>

                <Divider />

                <section>
                    <SectionTitle>Education</SectionTitle>
                    <section className="my-6">
                        <p className="font-bold">BTEC</p>
                        <p>DB Training / Harlow College, 2011 - 2013</p>
                        <p>Level 2 & Level 3 Web Developer</p>
                    </section>

                    <section className="my-6">
                        <p className="font-bold">GCSEs</p>
                        <p>Great Baddow High School, 2005 - 2010</p>
                        <p>Biology, Chemistry, Physics - A</p>
                        <p>Maths - B</p>
                        <p>English, English Literature - C</p>
                    </section>
                </section>
            </div>

            <section className="mx-auto my-8 text-center max-w-sm w-full">
                <button className={`w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-800 transition-colors ${isPDF ? 'hidden' : 'visible'}`} onClick={toggleIsPDF}>Download as PDF</button>
            </section>
        </>
    )
};

export default Resume;