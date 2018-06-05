<template>
    <section>
        <b-container>
            <site-header></site-header>

            <b-row align-v="center" class="justify-content-md-center" v-if="Object.keys(data).length === 0">
                <loading-spinner/>
            </b-row>

            <section v-if="Object.keys(data).length > 0">


                <b-row align-v="center" class="justify-content-md-center">
                    <b-col cols="4">
                        <b-img :src="data.Poster" fluid alt="Responsive image"/>
                    </b-col>
                    <b-col cols="8">
                        <b-row>
                            <b-col>
                                <h2>{{ data.Title}}</h2>
                                <p>{{ data.Year }}</p>
                                <p>{{ data.Runtime }}</p>
                                <p>{{ data.Plot }}</p>
                            </b-col>
                            <b-col></b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <dl class="row">
                                    <dt class="col-sm-3">Director</dt>
                                    <dd class="col-sm-9">{{ data.Director }}</dd>

                                    <dt class="col-sm-3">Writer</dt>
                                    <dd class="col-sm-9">{{ data.Writer }}</dd>

                                    <dt class="col-sm-3">Genere</dt>
                                    <dd class="col-sm-9">{{ data.Genre }}</dd>

                                    <dt class="col-sm-3">Production</dt>
                                    <dd class="col-sm-9">{{ data.Production }}</dd>

                                    <dt class="col-sm-3">Released</dt>
                                    <dd class="col-sm-9">{{ data.Released }}</dd>

                                    <dt class="col-sm-3">Malesuada porta</dt>
                                    <dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

                                    <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
                                    <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris
                                        condimentum nibh, ut fermentum massa justo sit amet risus.
                                    </dd>

                                    <dt class="col-sm-3">Ratings</dt>
                                    <dd class="col-sm-9">
                                        <dl class="row mb-0" v-for="rating in data.Ratings">
                                            <dt class="col-sm-8">{{ rating.Source }}</dt>
                                            <dd class="col-sm-4">{{ rating.Value }}</dd>
                                        </dl>
                                    </dd>
                                </dl>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <h4>Acctors</h4>
                        <p>{{ data.Actors }}</p>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <h4>Awards</h4>
                        <p>{{ data.Awards }}</p>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <h4>Box Office</h4>
                        <p class="text-danger">{{ data.BoxOffice }}</p>
                    </b-col>
                </b-row>
            </section>
        </b-container>
    </section>
</template>

<script>

    import siteHeader from '../components/siteHeader'
    import LoadingSpinner from "../components/loadingSpinner";

    export default {
        name: 'movieInfo',
        components: {
            LoadingSpinner,
            siteHeader
        },
        data() {
            return {
                data: {}
            }
        },
        created: function () {
            document.title = 'SPA MovieDatabase';
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