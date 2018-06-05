<template>
    <b-card no-body class="entry-info">
        <b-card-img :src="getPoster()" alt="Image" top class="card-img-equal"></b-card-img>
        <b-card-body>
            <b-row class="justify-content-center align-items-end h-100">
                <b-col cols="12"><h5>{{ data.Title }}</h5></b-col>
                <b-col cols="12">
                    <b-button class="btn-sm mx-0" :href="generateUrl()" variant="primary">{{ data.Type }} page</b-button>
                    <b-button class="btn-sm mx-0" v-b-modal.modallg :href="previewUrl()" variant="info">{{ data.Type }} preview</b-button>
                </b-col>
            </b-row>
        </b-card-body>
        <b-card-footer class="pt-1 pl-3 pb-2">
            <p class="text-muted mb-0">
                <small>
                    <b-badge :variant="getAccentColor()">{{data.Type}}</b-badge>
                </small>
            </p>
        </b-card-footer>
    </b-card>
</template>

<script>
    export default {
        name: 'movie-item',
        props: {
            data: Object
        },

        methods: {
            generateUrl() {
                return '#/info/' + this.data.imdbID;
            },
            previewUrl() {
                return '#/preview/' + this.data.imdbID;
            },
            getPoster() {
                if (this.data.Poster === 'N/A') {
                    return 'http://via.placeholder.com/288x362?text=no%20image';
                }
                return this.data.Poster
            },

            getAccentColor() {
                switch (this.data.Type) {
                    case 'movie':
                        return 'primary';
                    case 'game':
                        return 'warning';
                    case 'series':
                        return 'info';
                    default:
                        return 'dark';
                }
            }
        }
    }
</script>