import MainView from '@/views/MainViews/MainView.vue';
import OpenTestView from '@/views/MainViews/OpenTestView.vue';
import StatisticsView from '@/views/MainViews/StatisticsView.vue';
import StudentsView from '@/views/MainViews/StudentsView.vue';
import TestsView from '@/views/MainViews/TestsView.vue';
import NotFoundView from '@/views/MetaViews/NotFoundView.vue';
import type { RouteRecordRaw } from 'vue-router';


export default [
    {
        path: '/main',
        name: 'main',
        component: MainView,
        redirect: { name: 'statistics' },
        meta: {
            requiredAuth: true,
        },
        children: [
            {
                path: 'statistics',
                name: 'statistics',
                component: StatisticsView,
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'tests',
                name: 'tests',
                component: TestsView,
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'test/:testId',
                name: 'test',
                component: OpenTestView,
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'students',
                name: 'students',
                component: StudentsView,
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'notFound',
                component: NotFoundView,
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFoundView,
    },

] as RouteRecordRaw[];