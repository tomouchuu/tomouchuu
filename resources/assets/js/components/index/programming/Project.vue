<template>
    <div class="project">
        <img v-bind:src="imageSrc" v-bind:alt="project">
        <h3 class="title">- {{ project }} -</h3>
        <h3 class="links">
            <a v-if="githubLink" v-bind:href="githubLink" v-bind:title="`See ${project} on Github`">Github</a>
            <span v-if="githubLink && websiteLink"> || </span>
            <a v-if="websiteLink" v-bind:href="websiteLink" v-bind:title="`Go to ${project}`">Website</a>
        </h3>
        <div class="clearfix"></div>
        <p>{{ projectDescription }}</p>
    </div>
</template>

<script>
    //https://github.com/Justineo/vue-octicon
    export default {
        name: 'project',
        props: [
            'project',
            'github-link',
            'website-link',
            'project-description',
            'image-src',
        ],
        data() {
            return {
                // github: JSON.parse(this.githubjson),
            }
        },
    }
</script>

<style scoped>
    .project {
        margin-bottom: 30px;
    }

    img {
        max-width: 100%;
    }

    h3 {
        margin-top: -15px;
        margin-bottom: 0;
    }

    h3.title {
        float: left;
        text-transform: uppercase;
    }

    h3.links {
        float: right;
    }
        h3.links a {
            color: #ddd;
            text-decoration: none;
        }
            h3.links a:hover {
                color: #fff;
                text-decoration: underline;
            }
</style>
