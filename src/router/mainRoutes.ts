// import CreateTestView from '@/views/MainViews/CreateTestView.vue';
// import GroupsView from '@/views/MainViews/GroupsView.vue';
// import StatisticsView from '@/views/MainViews/StatisticsView.vue';
// import StudentsView from '@/views/MainViews/StudentsView.vue';
// import TestOpenView from '@/views/MainViews/TestOpenView.vue';
import TestsView from '@/views/MainViews/TestsView.vue';
// import NotFoundView from '@/views/MetaViews/NotFoundView.vue';
import MainView from '@/views/MainViews/MainView.vue';
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
                component: () => import('@/views/MainViews/StatisticsView.vue'),
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'groups',
                name: 'groups',
                component: () => import('@/views/MainViews/GroupsView.vue'),
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'groups/:groupId/tests',
                name: 'groupTests',
                // component: () => import('@/views/MainViews/TestsView.vue'),
                component: TestsView,
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'tests',
                name: 'tests',
                // component: () => import('@/views/MainViews/TestsView.vue'),
                component: TestsView,
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'tests/test/:testId',
                name: 'opennedTest',
                component: () => import('@/views/MainViews/TestOpenView.vue'),
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'tests/check/test/:testId/result/:resultId',
                name: 'checkResult',
                component: () => import('@/views/MainViews/ResultCheckView.vue'),
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'tests/new',
                name: 'createTest',
                component: () => import('@/views/MainViews/CreateTestView.vue'),
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: 'students',
                name: 'students',
                component: () => import('@/views/MainViews/StudentsView.vue'),
                meta: {
                    requiredAuth: true,
                },
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'notFound',
                component: () => import('@/views/MetaViews/NotFoundView.vue'),
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/MetaViews/NotFoundView.vue'),
    },

] as RouteRecordRaw[];