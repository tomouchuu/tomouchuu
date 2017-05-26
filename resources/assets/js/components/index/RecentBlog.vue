<template>
    <div class="recent-blog">
        <div class="recent-blog-container">
            <h3>- {{ blogpost.title }} -</h3>
            <h4>{{ blogpost.date }}</h4>
            <div class="snippet">
                <p>{{ snippet() }}</p>
            </div>
            <a v-bind:href="`/blog/show/${blogpost.file}`" title="READ MORE" class="read-more">READ MORE...</a>
        </div>
    </div>
</template>

<script>
    const parse5 = require('parse5');

    export default {
        name: 'recent-blog',
        props: [
            'blogpostjson',
        ],
        data() {
            return {
                blogpost: JSON.parse(this.blogpostjson),
                snippet() {
                    const blogpost = parse5.parseFragment(this.blogpost.content);
                    const snippet = blogpost.childNodes[0].childNodes[0].value;
                    return snippet;
                }
            }
        },
    }
</script>

<style scoped>
    .recent-blog {
        background: #2ECC40;
        color: #111;
        padding: 20px;
    }
        .recent-blog a,
        .recent-blog a:hover {
            transition: all .2s;
        }
        .recent-blog a {
            color: #333;
        }
            .recent-blog a:hover {
                color: #222;
            }
            .recent-blog a.read-more {
                display: block;
                text-align: right;
            }

    .recent-blog-container {
        margin: 0 auto;
        width: 800px;
    }

    .recent-blog h3 {
        margin: 0;
    }
    .recent-blog p {
        text-align: justify;
    }

    @media screen and (max-width: 840px) {
        .recent-blog-container {
            width: 100%;
        }
    }
</style>
