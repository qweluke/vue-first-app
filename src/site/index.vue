<template>
    <section>
        <b-container>

            <site-header></site-header>

            <b-row align-v="center" class="text-center justify-content-md-center">
                <b-col cols="12">
                    <h2>Search for the movie</h2>
                </b-col>
                <b-col cols="6">
                    <b-form>
                        <b-input class="py-3" placeholder="eg. Hobbit" @keyup.native="search" v-model="query"/>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>

        <b-container fluid>
            <b-row v-if="results.length > 0" class="mt-5 mx-3">

                <b-col sm="6" md="4" lg="3" class="mb-4" v-for="result in results">
                    <movie-item :data="result"></movie-item>
                </b-col>

            </b-row>
        </b-container>

        <div>
            <router-view name="preview"></router-view>

        </div>
    </section>
</template>

<script>

    import siteHeader from '../components/siteHeader'
    import movieItem from '../components/movieItem'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'index',
        components: {
            siteHeader, movieItem
        },

        data() {
            return {
                query: null,
                xhr: null,
                cancelToken: null,
                source: null,
                results: []
            }
        },

        created: function () {
            this.cancelToken = this.axios.CancelToken;
            this.source = this.cancelToken.source();

            document.title = 'SPA MovieDatabase';
            document.getElementsByTagName('body')[0].classList.add('bg-light');
        },
        methods: {
            search() {

                if (this.query.length <= 3) {
                    return;
                }

                if(typeof this.xhr !== 'null') {
                    this.source.cancel('Operation canceled by the user.');
                    this.xhr = null;
                }
                this.xhr = this.axios.get('&s=' + this.query, {
                    cancelToken: this.source.token
                })
                    .then((response) => {
                        this.results = response.data.Search || []
                    })
                    .finally(() => {
                        this.xhr = null;
                    })
                ;

            }
        }
    };
</script>