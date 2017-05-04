<template>
    <div class="recent-blog">
        <div class="recent-blog-container">
            <h3>- TITLE -</h3>
            <h4>DATE</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, libero consectetur quidem necessitatibus nisi vel, illum, quis impedit obcaecati mollitia enim reiciendis. Provident in libero, eligendi maxime, sit cumque minus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, libero consectetur quidem necessitatibus nisi vel, illum, quis impedit obcaecati mollitia enim reiciendis. Provident in libero, eligendi maxime, sit cumque minus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, libero consectetur quidem necessitatibus nisi vel, illum, quis impedit obcaecati mollitia enim reiciendis. Provident in libero, eligendi maxime, sit cumque minus.</p>
            <a href="" title="READ MORE" class="read-more">READ MORE...</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'recent-blog',
        props: [
            'personaljson',
        ],
        data() {
            return {
                personal: JSON.parse(this.personaljson),
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
