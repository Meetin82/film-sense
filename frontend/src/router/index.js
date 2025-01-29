import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';

const routes = [
    {
        path: '/search',
        name: 'Search',
        component: App,  // Это компонент, который отображает ваш список фильмов
    },
    // добавьте другие маршруты, если нужно
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
