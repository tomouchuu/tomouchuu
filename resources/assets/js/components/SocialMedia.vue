<template>
    <a v-bind:href="url" v-bind:class="network">
        <icon v-bind:label="network" scale="2">
            <icon name="square" scale="2"></icon>
            <icon class="socialicon" v-bind:name="icon()" v-bind:scale="iconScale()"></icon>
        </icon>
    </a>
</template>

<script>
    import 'vue-awesome/icons/square';
    import 'vue-awesome/icons/twitter';
    import 'vue-awesome/icons/envelope';
    import 'vue-awesome/icons/newspaper-o';
    import 'vue-awesome/icons/trello';
    import 'vue-awesome/icons/instagram';
    import 'vue-awesome/icons/github';
    import Icon from 'vue-awesome/components/Icon';

    Icon.register({
        mastodon: {
            width: 1000,
            height: 1000,
            d: 'M500 0a500 500 0 0 0-353.553 146.447 500 500 0 1 0 707.106 707.106A500 500 0 0 0 500 0zm-.059 280.05h107.12c-19.071 13.424-26.187 51.016-27.12 73.843V562.05c0 44.32-35.68 80-80 80s-80-35.68-80-80v-202c0-44.32 35.68-80 80-80zm-.441 52c-15.464 0-28 12.537-28 28 0 15.465 12.536 28 28 28s28-12.535 28-28c0-15.463-12.536-28-28-28zm-279.059 7.9c44.32 0 80 35.68 80 80v206.157c.933 22.827 8.049 60.42 27.12 73.842H220.44c-44.32 0-80-35.68-80-80v-200c0-44.32 35.68-80 80-80zm559.12 0c44.32 0 80 35.68 80 80v200c0 44.32-35.68 80-80 80H672.44c19.071-13.424 26.187-51.016 27.12-73.843V419.95c0-44.32 35.68-80 80-80zM220 392c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm560 0c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm-280.5 40.05c-15.464 0-28 12.537-28 28 0 15.465 12.536 28 28 28s28-12.535 28-28c0-15.463-12.536-28-28-28zM220 491.95c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zm560 0c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zM499.5 532c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zM220 591.95c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zm560 0c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28z'
        }
    });

    export default {
        name: 'socialmedia',
        components: {
            Icon
        },
        props: [
            'network',
            'url',
        ],
        data() {
            return {
                icon: function() {
                    if (this.network === 'email') {
                        return 'envelope';
                    } else if (this.network === 'blog') {
                        return 'newspaper-o';
                    }
                    return this.network;
                },
                iconScale: function() {
                    if (this.network === 'mastodon') {
                        return 2;
                    }
                    return 1;
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    // Brandcolours from https://github.com/reimertz/brand-colors/blob/master/dist/latest/scss/brand-colors.latest.scss
    $white: #fff;
    $bc-twitter: #55acee;
    $bc-instagram: #3f729b;
    $bc-github-4: #333333;
    $bc-trello: #0079bf;
    $bc-mastodon: #189efc;
    $email: #FF4136;
    $blog: #2ECC40;

    a {
        margin-left: 7.5px;
        margin-right: 7.5px;
        &:hover {
            transition: all .2s;
        }
    }

    .twitter {
        color: $bc-twitter;
        &:hover {
            color: $white;
            .socialicon {
                fill: $bc-twitter;
            }
        }
    }
    .instagram {
        color: $bc-instagram;
        &:hover {
            color: $white;
            .socialicon {
                fill: $bc-instagram;
            }
        }
    }
    .github {
        color: $bc-github-4;
        &:hover {
            color: $white;
            .socialicon {
                fill: $bc-github-4;
            }
        }
    }
    .trello {
        color: $bc-trello;
        &:hover {
            color: $white;
            .socialicon {
                fill: $bc-trello;
            }
        }
    }
    .mastodon {
        color: $bc-mastodon;
        &:hover {
            color: $white;
            .socialicon {
                fill: $bc-mastodon;
            }
        }
    }
    .email {
        color: $email;
        &:hover {
            color: $white;
            .socialicon {
                fill: $email;
            }
        }
    }
    .blog {
        color: $blog;
        &:hover {
            color: $white;
            .socialicon {
                fill: $blog;
            }
        }
    }

    a .socialicon {
        fill: $white;
    }
</style>
