import Home from "./shared/presentation/views/home.vue";
import {createRouter, createWebHistory} from "vue-router";
import publishingRoutes from "./publishing/presentation/publishing-routes.js";

const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/home',            name: 'home',           component: Home, meta: { title: 'Home' } },
    { path: '/about',           name: 'about',          component: about, meta: { title: 'About' } },
    { path: '/publishing',      name: 'publishing',     children: publishingRoutes },
    { path: '/',                redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'not-found',      component: pageNotFound, meta: { title: 'Page not found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'ACME Learning Center';
    document.title = `${to.meta["title"]} | ${baseTitle}`;
    next();
});

export default router;