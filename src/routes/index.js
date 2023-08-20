import { createRouter, createWebHistory } from "vue-router";
import {
	checkAuth,
	isAdmin,
	isUser,
	setAuth,
	middlewareHandler,
} from "./middleware.js";

const routes = [
	{
		path: "/",
		component: () =>
			import(/* webpackChunkName: "home-page" */ "@/components/Home.vue"),
	},
	{
		path: "/login",
		component: () =>
			import(/* webpackChunkName: "home-page" */ "@/components/Login.vue"),
		meta: {
			middleware: [checkAuth],
		},
	},
	{
		path: "/user",
		component: () =>
			import(/* webpackChunkName: "user-page" */ "@/components/User.vue"),
		meta: {
			middleware: [setAuth, isUser],
		},
	},
	{
		path: "/admin",
		component: () =>
			import(/* webpackChunkName: "admin-page" */ "@/components/Admin.vue"),
		meta: {
			middleware: [setAuth, isAdmin],
		},
	},
	{
		path: "/dashboard",
		component: () =>
			import(
				/* webpackChunkName: "dashboard-page" */ "@/components/Dashboard.vue"
			),
		meta: {
			middleware: [setAuth],
		},
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
	if (!to.meta.hasOwnProperty("middleware")) {
		return next();
	}

	const middleware = to.meta.middleware;
	const context = { to, from, next };

	return middleware[0]({
		...context,
		next: middlewareHandler(context, middleware, 1),
	});
});

export default router;
