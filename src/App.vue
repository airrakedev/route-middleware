<script setup>
import { ref } from "vue";
import useAuth from "@/composables/useSetAuth";

const { logout } = useAuth();

const routes = [
	{
		label: "Login",
		path: "/login",
	},
	{
		label: "User",
		path: "/user",
	},
	{
		label: "Admin",
		path: "/admin",
	},
	{
		label: "Dashboard",
		path: "/dashboard",
	},
	{
		label: "Home",
		path: "/",
	},
];

const logOut = () => {
	logout();
};
</script>

<template>
	<div>
		<div>
			<template v-for="route in routes" :key="route.path">
				-<router-link :to="{ path: route.path }">{{ route.label }}</router-link
				>--
			</template>
			<a href="#" @click.prevent="logOut">Logout</a>
		</div>
		<router-view></router-view>
	</div>
</template>

<style scoped></style>
