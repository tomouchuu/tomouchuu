<template>
    <div class="programming">
        <h2>- PROGRAMMING -</h2>
        <div class="projects-container">
            <div class="projects">
                <project
                    project="Disbott"
                    github-link="https://github.com/uchuuio/disbott"
                    website-link="https://disbott.uchuu.io"
                    project-description="Disbott is a bot for Discord. It's written in node and is primarily in use for some fun commands on mine and friends' discord servers."
                    image-src="/images/projects/disbott.png"
                />
                <project
                    project="Start (スタート)"
                    github-link="https://github.com/tomouchuu/start"
                    project-description="This start page replaces your browser's new tab page and is a nice looking alternative which can be customisable with a few changes to the config file."
                    image-src="/images/projects/start.png"
                />
                <project
                    project="Zen"
                    github-link="https://github.com/tomouchuu/zen"
                    website-link="https://zen.uchuu.io"
                    project-description="A webpage to display a thoughtful message everyday. It also exposes an API. Uses express & handlebars."
                    image-src="/images/projects/zen.png"
                />
            </div>
        </div>
        <div class="code-timeline-container">
            <div class="code-timeline">
                <githubEvent v-for="ghevent in github()" v-bind:key="ghevent.id" v-bind:gh-event="ghevent" />
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
</template>

<script>
    import project from './Project.vue';
    import githubEvent from './GithubEvent.vue';

    export default {
        name: 'programming',
        components: {
            project,
            githubEvent,
        },
        props: [
            'githubjson',
        ],
        data() {
            return {
                windowWidth: 0,
                github() {
                    const github = JSON.parse(this.githubjson);
                    if (this.windowWidth < 1080) {
                        return github.slice(0, 7);
                    }
                    return github;
                },
            }
        },
        mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.getWindowWidth);
                this.getWindowWidth();
            });
        },

        methods: {
            getWindowWidth(event) {
                this.windowWidth = document.documentElement.clientWidth;
            },
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>

<style scoped>
    .programming {
        background: #333333;
        color: #fff;
    }
        .programming h2 {
            text-align: center;
            margin: 0;
            padding-top: 20px;
        }

    .programming .projects-container,
    .programming .code-timeline-container {
        float: left;
    }

    .programming .projects-container {
        width: 75%;
    }

    .programming .code-timeline-container {
        width: 25%;
    }

    .programming .projects,
    .programming .code-timeline {
        padding: 20px;
    }

    @media screen and (max-width: 1080px) {
        .programming .projects-container {
            width: 66%;
        }

        .programming .code-timeline-container {
            width: 33%;
        }
    }

    @media screen and (max-width: 768px) {
        .programming .projects-container {
            width: 100%;
        }

        .programming .code-timeline-container {
            width: 100%;
        }
    }
</style>
<style>
    .programming a {
            color: #ddd;
            text-decoration: none;
        }
            .programming a:hover {
                color: #fff;
                text-decoration: underline;
            }
</style>
