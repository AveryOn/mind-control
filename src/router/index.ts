import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/MetaViews/NotFoundView.vue';

// LoginRoutes
import loginRoutes from './loginRoutes';
// MainRoutes
import mainRoutes from './mainRoutes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: 'reception' }
        },
        ...loginRoutes,
        ...mainRoutes,
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFoundView,
        },
    ]
})


router.beforeEach((to, from, next) => {
    next();
})

export default router;
