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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quod laudantium, distinctio sint mollitia aliquid ratione ipsam esse provident, delectus maxime, optio repellat sapiente voluptates veniam beatae quos ab reprehenderit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quod laudantium, distinctio sint mollitia aliquid ratione ipsam esse provident, delectus maxime, optio repellat sapiente voluptates veniam beatae quos ab reprehenderit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quod laudantium, distinctio sint mollitia aliquid ratione ipsam esse provident, delectus maxime, optio repellat sapiente voluptates veniam beatae quos ab reprehenderit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quod laudantium, distinctio sint mollitia aliquid ratione ipsam esse provident, delectus maxime, optio repellat sapiente voluptates veniam beatae quos ab reprehenderit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quod laudantium, distinctio sint mollitia aliquid ratione ipsam esse provident, delectus maxime, optio repellat sapiente voluptates veniam beatae quos ab reprehenderit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quod laudantium, distinctio sint mollitia aliquid ratione ipsam esse provident, delectus maxime, optio repellat sapiente voluptates veniam beatae quos ab reprehenderit.</p>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
</template>

<script>
    //https://github.com/Justineo/vue-octicon
    import project from './Project.vue';

    export default {
        name: 'programming',
        components: {
            project,
        },
        // props: [
        //     'githubjson',
        // ],
        // data() {
        //     return {
        //         github: JSON.parse(this.githubjson),
        //     }
        // },
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
