<template>
    <div class="recent-tweet">
        <div class="recent-tweet-container">
            <h3>- Recent Tweet -</h3>
            <div class="text" v-html="text()"></div>
            <a class="date" v-bind:href="statusurl()" v-bind:title="twitter.status.created_at" target="_blank">{{ relativedate() }}</a>
        </div>
    </div>
</template>

<script>
    import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
    import twitter from 'twitter-text';

    export default {
        name: 'recent-tweet',
        props: [
            'twitterjson'
        ],
        data() {
            return {
                twitter: JSON.parse(this.twitterjson),
                text() {
                    return twitter.autoLink(this.twitter.status.text);
                },
                relativedate() {
                    return distanceInWordsToNow(this.twitter.status.created_at, {addSuffix: true});
                },
                statusurl() {
                    return `https://twitter.com/${this.twitter.screen_name}/status/${this.twitter.status.id}`;
                }
            }
        },
    }
</script>

<style>
    .recent-tweet {
        background: #55acee;
        color: #333;
        padding: 20px;
    }
        .recent-tweet a,
        .recent-tweet a:hover { transition: all .2s; }
        .recent-tweet a { color: #111; }
            .recent-tweet a:hover { color: #222; }

    .recent-tweet-container {
        margin: 0 auto;
        width: 800px;
    }

    h3 {
        color: #fff;
        margin: 0;
    }
    .text { text-align: center; }
    .date {
        display: block;
        text-align: right;
    }
</style>
