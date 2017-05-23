<template>
    <div class="idol" v-bind:style="`background-image: url(${idoldata.profile_image_url_https}); border-color: #${idoldata.profile_link_color}`">
        <div class="idol-details">
            <p>{{ idoldata.name }}</p>
            <p>
                <a v-bind:href="`https://www.twitter.com/${idoldata.screen_name}`" v-bind:title="`Follow @${idoldata.screen_name} on Twitter`" class="twitter">
                    <icon name="twitter" scale="2" />
                </a>
                <a v-bind:href="idoldata.expanded_url" title="Website" class="url">
                    <icon name="globe" scale="2" />
                </a>
            </p>
        </div>
    </div>
</template>

<script>
    import 'vue-awesome/icons/twitter';
    import 'vue-awesome/icons/globe';
    import Icon from 'vue-awesome/components/Icon';

    export default {
        name: 'idol',
        components: {
            Icon
        },
        props: [
            'idoldata',
        ],
    }
</script>

<style lang="scss" scoped>
    // Brandcolours from https://github.com/reimertz/brand-colors/blob/master/dist/latest/scss/brand-colors.latest.scss
    $white: #fff;
    $bc-twitter: #55acee;
    $globe: #2ECC40;

    .idol {
        border: 2px solid;
        float: left;
        margin: 15px;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        width: 300px;
        height: 300px;

        .idol-details {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            font-size: 24px;
            text-align: center;

            p {
                margin: 0;
            }
        }
    }

    .twitter {
        color: $bc-twitter;
        &:hover {
            color: $white;
        }
    }
    .url {
        color: $globe;
        &:hover {
            color: $white;
        }
    }
</style>
