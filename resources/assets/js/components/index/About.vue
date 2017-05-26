<template>
    <div class="about-container">
        <p>So hello there, I'm {{ personal.name }}. I'm {{ age() }}, from {{ personal.location }} and currently {{ employment() }}.</p>
        <p>I'm primarily a frontend developer with a heavy focus on javascript using frameworks like reactjs & vuejs for my frontends along with a combination with knowledge of most css solutions (css, scss, less, stylus, postcss, css in js). I do also a little bit of backend work, either in javascript with node or php where I use laravel. I'm learning C# where I can.</p>
        <p>Outside of coding, I'm a big fan of things japanese whether it's music (mostly IDOL (<a href="/oshimen" title="oshis">oshi-list</a>)), tv (not anime) or aesthetics and I try to get over there every 2 years at least. I'm trying to learn the language via a tutor and self teaching where I'm using wanikani for learning kanji (level {{wanikani.user_information.level}} scrub here). I'm currently struggling on {{ wkCriticalItem() }}. You can keep up to date with my progress <a href="/wk-stats">here</a>.</p>
        <p>I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry not sorry).</p>
        <p>You might be wondering what uchuu is. Uchuu is a circle that I created with a few of my friends, the aim, do cool multimedia stuff and help each other out. The idea came from japanese groups, that would be a part of a group yet able to be their own individual ala ryo(supercell) so therefore I'm tomo@uchuu!</p>
    </div>
</template>

<script>
    import parse from 'date-fns/parse';
    import differenceInYears from 'date-fns/difference_in_years';

    export default {
        name: 'about',
        props: [
            'personaljson',
            'wanikanijson',
        ],
        data() {
            return {
                personal: JSON.parse(this.personaljson),
                wanikani: JSON.parse(this.wanikanijson),
                age() {
                    const now = new Date();
                    const birthday = parse(this.personal.birthday);
                    return differenceInYears(new Date(), birthday);
                },
                employment() {
                    if (this.personal.work[0].company === 'unemployed') {
                        return `I'm looking for work (get in touch if you feel like it!)`;
                    }
                    return `work in ${ this.personal.based } at ${ this.personal.work[0].company }`;
                },
                wkCriticalItem() {
                    const criticalItem = this.wanikani.critical_items[0];
                    let criticalItemAnswer;
                    if (criticalItem.type === 'kanji') {
                        if (criticalItem.important_reading === 'kunyomi') {
                            criticalItemAnswer = criticalItem.kunyomi;
                        } else if (criticalItem.important_reading === 'nanori') {
                            criticalItemAnswer = criticalItem.nanori;
                        } else {
                            criticalItemAnswer = criticalItem.onyomi;
                        }
                    } else if (criticalItem.type === 'vocabulary') {
                        criticalItemAnswer = criticalItem.kana;
                    } else {
                        // Radical
                        criticalItemAnswer = 'a radical';
                    }
                    return `${criticalItem.character} (${criticalItemAnswer}) which means ${criticalItem.meaning} and I get it correct ${criticalItem.percentage}% of the time`;
                }
            }
        },
    }
</script>

<style>
    .about-container {
        margin: 0 auto;
        padding: 20px;
        text-align: justify;
        width: 800px;
    }
    @media screen and (max-width: 840px) {
        .about-container {
            padding: 0;
            width: 100%;
        }
            .about-container p {
                padding-left: 20px;
                padding-right: 20px;
            }
    }
</style>
