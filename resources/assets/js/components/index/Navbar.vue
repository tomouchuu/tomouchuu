<template>
    <nav v-bind:class="navclass()">
        <ul class="links">
            <li v-for="(name, url) in navlinks()"><a v-bind:href="url">{{ name }}</a></li>
        </ul>
        <ul class="socials">
            <li v-for="(url, network) in personal.contact">
                <socialmedia v-bind:url="url" v-bind:network="network" scale="1" />
            </li>
        </ul>
        <div class="clearfix"></div>
    </nav>
</template>

<script>
    //@TODO: Make sticky
    import socialmedia from './../SocialMedia.vue';

    export default {
        name: 'navbar',
        components: {
            socialmedia,
        },
        props: [
            'navbartype',
            'personaljson',
        ],
        data() {
            return {
                personal: JSON.parse(this.personaljson),
                navclass() {
                    if (this.navbartype === 'blog') {
                        return 'blog-nav';
                    }
                    return 'home-nav';
                },
                navlinks() {
                    if (this.navbartype === 'blog') {
                        return {
                            '/blog': 'tomo@uchuu blog',
                            '/blog/archive': 'blog archive',
                            '/': 'to main site',
                        };
                    }
                    return {
                        '#intro': 'TOP',
                        '#about': 'ABOUT',
                        '#programming': 'PROGRAMMING',
                    }
                }
            }
        },
    }
</script>

<style scoped>
    nav {
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        padding-left: 7.5px;
        padding-right: 7.5px;
    }
    nav.home-nav {
        background: rgba(0, 0, 0, 0.9);
    }
    nav.blog-nav {
        background: rgba(46, 204, 64, 0.75);
    }
    nav ul {
        float: left;
        list-style: none;
        padding-left: 0;
    }
        nav ul li {
            display: inline-block;
        }
            nav ul li a {
                color: #fff;
                margin-left: 7.5px;
                margin-right: 7.5px;
            }
                nav ul li a:hover {
                    color: #ddd;
                }

    nav ul.links {
        margin-top: 22px;
        margin-bottom: 22px;
        margin-left: 7.5px;
    }

    nav ul.socials {
        float: right;
        margin-left: 0;
    }

    @media screen and (max-width: 500px) {
        nav ul {
            text-align: center;
            width: 100%;
        }
            nav ul.links {
                margin-left: 0;
                margin-bottom: 5px;
            }
    }
</style>
