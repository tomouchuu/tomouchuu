<template>
    <div class="idols">
        <idol v-for="idol in idols" v-bind:key="idol.id" v-bind:idoldata="idol" />
    </div>
</template>

<script>
    import Idol from './Idol';

    export default {
        name: 'idols',
        components: {
            Idol
        },
        props: [
            'idoljson',
        ],
        data() {
            return {
                idols: JSON.parse(this.idoljson),
            }
        }
    }
</script>

<style scoped>
    .idols {
        max-width: 1336px;
        width: 100%;
    }
</style>
