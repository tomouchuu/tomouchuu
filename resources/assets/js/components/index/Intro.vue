<template>
    <div class="intro">
        <div class="intro-container">
            <img class="profile-img" v-bind:src="profileimg()" v-bind:alt="personal.name" /><br>
            Hi I'm <h1>{{ personal.name }}</h1>, <b>{{ age() }} years old</b>, from <b>{{ personal.location }}</b> and based in <b>{{ personal.based }}</b> where I'm currently <span v-html="employment()"></span>.
            <p style="font-size: 1.2rem;">Find me on:</p>
            <ul class="social-list">
                <li v-for="(url, network) in personal.contact">
                    <socialmedia v-bind:url="url" v-bind:network="network" scale="2" />
                </li>
            </ul>
            <p class="signature">- トモ＠宇宙 -</p>
        </div>
    </div>
</template>

<script>
    import parse from 'date-fns/parse';
    import differenceInYears from 'date-fns/difference_in_years';
    import socialmedia from './../SocialMedia.vue';

    export default {
        name: 'intro',
        components: {
            socialmedia,
        },
        props: [
            'personaljson',
            'profileimgurl',
        ],
        data() {
            return {
                personal: JSON.parse(this.personaljson),
                profileimg() {
                    const profileimg = this.profileimgurl.replace('_normal', '');
                    return profileimg;
                },
                age() {
                    const now = new Date();
                    const birthday = parse(this.personal.birthday);
                    return differenceInYears(new Date(), birthday);
                },
                employment() {
                    if (this.personal.work[0].company === 'unemployed') {
                        return `looking for work, <a href="mailto:${ this.personal.contact.email }" class="lookingfor">get in touch</a>`;
                    }
                    return `working at <b>${ this.personal.work[0].company }</b>`;
                }
            }
        },
    }
</script>

<style>
    .intro {
        display: flex;
        padding: 100px;
        font-size: 1.4rem;
    }
        .intro h1 {
            display: inline;
            font-size: 2.75rem;
        }
        .intro b {
            font-size: 2rem;
        }

    .intro-container {
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid #fff;
        border-radius: 4px;
        color: #fff;
        margin: 0 auto;
        padding: 0 30px 30px;
        width: 550px;
        line-height: 40px;
    }

    .profile-img {
        border-radius: 50%;
        border: 1px solid #fff;
        float: left;
        margin-top: 60px;
        margin-right: 30px;
        width: 170px;
    }

    .lookingfor {
        color: #ddd;
        text-decoration: none;
    }
        .lookingfor:hover {
            color: #fff;
            text-decoration: underline;
        }

    .social-list {
        list-style: none;
        padding-left: 0;
        margin: -15px 0 0;
        text-align: center;
    }
        .social-list li {
            display: inline-block;
        }

    .signature {
        font-size: 1rem;
        font-weight: light;
        margin: 0;
        text-align: center;
    }

    @media screen and (max-width: 800px) {
        .intro {
            padding: 30px;
        }
        .intro-container {
            width: 100%;
        }
    }

    @media screen and (max-width: 500px) {
        .profile-img {
            float: none;
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-top: 40px;
        }
    }
</style>
