import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Dashboard',
		component: () => import('../views/Dashboard.vue'),
	},
	{
		path: '/clients',
		name: 'Clients',
		component: () => import('../views/Clients.vue'),
	},
	{
		path: '/rooms',
		name: 'Rooms',
		component: () => import('../views/Rooms.vue'),
	},
	{
		path: '/checkins',
		name: 'Checkins',
		component: () => import('../views/Checkins.vue'),
	},
	{
		path: '/services',
		name: 'Services',
		component: () => import('../views/Services.vue'),
	},
	{
		path: '/employees',
		name: 'Employees',
		component: () => import('../views/Employees.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
