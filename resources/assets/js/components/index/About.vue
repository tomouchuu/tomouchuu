<template>
    <div class="about-container">
        <p>So hello there, I'm {{ personal.name }}. I'm {{ age() }} and from {{ personal.location }} and currently {{ employment() }}.</p>
        <p>I'm primarily a frontend developer with a heavy focus on javascript using frameworks like reactjs & vuejs for my frontends along with a combination with knowledge of most css solutions (css, scss, less, stylus, postcss, css in js). I do also a little bit of backend work, either in javascript with node or php where I use laravel. I'm learning C# where I can.</p>
        <p>Outside of coding, I'm a big fan of things japanese whether it's music (mostly IDOL (<a href="/oshis" title="oshis">oshi-list</a>)), tv (not anime) or aesthetics and I try to get over there every 2 years at least. I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry).</p>
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
                }
            }
        },
    }
</script>

<style>
    .about-container {
        margin: 0 auto;
        padding: 20px;
        width: 800px;
    }
    @media screen and (max-width: 840px) {
        .about-container {
            width: 100%;
        }
    }
</style>
