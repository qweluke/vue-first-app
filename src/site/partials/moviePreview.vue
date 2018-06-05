<template>
    <b-modal body-bg-variant="light" ref="modalMoviePreview" hide-footer no-fade id="modallg" size="lg" :title="data.Title" @hide="$router.go(-1)">
        <b-container fluid>

            <b-row align-v="center" class="justify-content-md-center" v-if="Object.keys(data).length === 0">
                <loading-spinner />
            </b-row>

            <b-row align-v="center" class="justify-content-md-center" v-if="Object.keys(data).length > 0">
                <b-col cols="6">
                    <b-img :src="data.Poster" fluid alt="Responsive image" />
                </b-col>
                <b-col cols="6">
                    <p>{{ data.Plot }}</p>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>

    import LoadingSpinner from "../../components/loadingSpinner";
    export default {
        name: 'moviePreview',
        components: {LoadingSpinner},
        data() {
            return {
                data: {}
            }
        },
        mounted: function() {
            this.$refs.modalMoviePreview.show()
        },
        created: function() {
            document.getElementsByTagName('body')[0].classList.add('bg-light');
            this.axios.get('&i=' + this.$route.params.id)
                .then((response) => {
                    this.data = response.data || {}
                })
                .finally(() => {
                    this.xhr = null;
                });
        }
    };
</script>
