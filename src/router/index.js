import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '../site/index'
import movieInfo from '../site/movieInfo'
import moviePreview from '../site/partials/moviePreview'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/info/:id',
            component: movieInfo
        },
        {
            path: '/',
            component: IndexPage,
            children: [{
                path: '/preview/:id',
                components: {
                    preview: moviePreview,
                }
            }]
        }
    ]
})