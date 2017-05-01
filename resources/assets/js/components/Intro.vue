<template>
    <div class="intro">
        <div class="container">
            <img class="profile-img" v-bind:src="profileimg()" v-bind:alt="personal.name" /><br>
            Hi I'm <h1>{{ personal.name }}</h1>, <b>{{ age() }} years old</b>, from <b>{{ personal.location }}</b> and based in <b>{{ personal.based }}</b> where I'm currently working at <b>{{ personal.work[0].company }}</b>.
            <p>Find me on:</p>
            <ul class="social-list">
                <li v-for="(url, network) in personal.contact">
                    {{ network }}
                </li>
            </ul>
            <p class="signature">- トモ＠宇宙 -</p>
        </div>
    </div>
</template>

<script>
    import parse from 'date-fns/parse';
    import differenceInYears from 'date-fns/difference_in_years';

    export default {
        name: 'intro',
        props: [
            'personaljson',
            'profileimgurl',
            'instagramjson',
        ],
        data() {
            return {
                personal: JSON.parse(this.personaljson),
                profileimg: function() {
                    const profileimg = this.profileimgurl.replace('_normal', '');
                    return profileimg;
                },
                instagram: JSON.parse(this.instagramjson),
                age: function() {
                    const now = new Date();
                    const birthday = parse(this.personal.birthday);
                    return differenceInYears(new Date(), birthday);
                },
            }
        },
        mounted() {
            console.log('Mounted');
        },
        methods: {
            updateBackground() {
                const self = this;
            }
        },
    }
</script>

<style scoped>
    .intro {
        background-color: #8eb4cb;
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

    .container {
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

    .social-list {
        list-style: none;
        padding-left: 0;
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
        .container {
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
