<template>
    <section>
        <b-container>

            <site-header></site-header>

            <b-row align-v="center" class="text-center justify-content-md-center">
                <b-col cols="12">
                    <h2>Search for the movie</h2>
                </b-col>
                <b-col cols="6">
                    <b-row>
                        <b-form class="w-100">
                            <b-col cols="12">
                                <b-input class="py-3 w-100" placeholder="eg. Hobbit" @keyup.native="search" v-model="searchForm.query"/>
                            </b-col>

                            <b-col cols="12 pt-2">
                                <b-link class="float-right text-muted" @click="toggleAdvancedSearch()">
                                    <i v-if="!advancedSearch" class="float-left fa fa-toggle-off fa-1x" aria-hidden="true"></i>
                                    <i v-if="advancedSearch" class="float-left fa fa-toggle-on fa-1x" aria-hidden="true"></i>
                                    <small class="pl-2 float-left">Advanced</small>
                                </b-link>
                            </b-col>

                            <b-col cols="12 mt-4">
                                <b-row v-if="advancedSearch">
                                    <b-col cols="6">
                                        <b-form-select class="mb-2 mr-sm-2 mb-sm-0"
                                                       v-model="searchType"
                                                       :value="null"
                                                       :options="{ 'movie': 'Movie', 'series': 'TV Show', 'game':'Game' }">
                                            <option slot="first" :value="null">Type</option>
                                        </b-form-select>
                                    </b-col>

                                    <b-col cols="6">
                                        <b-input class="mb-2 mr-sm-2 mb-sm-0" placeholder="year" v-model="searchForm.year" @keyup.native="search" />
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-form>
                    </b-row>
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
                advancedSearch: false,
                searchForm: {
                    query: null,
                    year: null
                },
                searchType: null,
                xhr: null,
                cancelToken: null,
                source: null,
                results: []
            }
        },

        watch: {
            // watch for searchType change
            searchType: function (value) {
                this.search();
            }
        },

        created: function () {
            this.cancelToken = this.axios.CancelToken;
            this.source = this.cancelToken.source();

            document.title = 'SPA MovieDatabase';
            document.getElementsByTagName('body')[0].classList.add('bg-light');
        },
        methods: {
            toggleAdvancedSearch() {
                this.advancedSearch = !this.advancedSearch;
                this.search();
            },
            search() {
                this.results = [];
                if (this.searchForm.query && this.searchForm.query.length <= 3) {
                    return;
                }

                if(typeof this.xhr !== 'null') {
                    // this.source.cancel('Operation canceled by the user.');
                    // this.xhr = null;
                }

                let query = '&s=' + this.searchForm.query;

                if(this.advancedSearch) {
                    query = query + '&type=' + this.searchType;

                    if(this.searchForm.year) {
                        query = query + '&y=' + this.searchForm.year;
                    }
                }
                this.xhr = this.axios.get(query, {
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