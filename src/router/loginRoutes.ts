import type { RouteRecordRaw } from 'vue-router';
import ReceptionView from '@/views/LoginViews/ReceptionView.vue';
import LoginView from '@/views/LoginViews/LoginView.vue';
import LogupView from '@/views/LoginViews/LogupView.vue';
import NotFoundView from '@/views/MetaViews/NotFoundView.vue';


export default [
    {
        path: '/reception',
        name: 'reception',
        component: ReceptionView,
        redirect: { name: 'login' },
        meta: {
            requiredAuth: false,
        },
        children: [
            {
                path: 'login',
                name: 'login',
                component: LoginView,
                meta: {
                    requiredAuth: false,
                },
            },
            {
                path: 'logup',
                name: 'logup',
                component: LogupView,
                meta: {
                    requiredAuth: false,
                },
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'notFound',
                component: NotFoundView,
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFoundView,
    },
] as RouteRecordRaw[];