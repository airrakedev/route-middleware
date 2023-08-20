<template>
	<div>
		<h2>Login page</h2>
		<template v-if="formError.status">
			<p>{{ formError.message }}</p>
		</template>

		<form @submit.prevent="submit">
			<p>
				<label for="name">Username</label>
				<input type="text" id="name" v-model="login.name" />
			</p>
			<p>
				<label for="password">Password</label>
				<input type="password" id="password" v-model="login.password" />
			</p>
			<p>Select account</p>
			<p>
				<label for="user">User</label>
				<input
					type="radio"
					v-model="login.userStatus"
					value="user"
					name="userStatus"
					id="user"
				/>
				<label for="admin">Admin</label>
				<input
					type="radio"
					v-model="login.userStatus"
					value="admin"
					name="userStatus"
					id="admin"
				/>
			</p>
			<input type="submit" value="Signin" />
		</form>
	</div>
</template>
<script setup>
import { ref, watch } from "vue";
import useSetAuth from "@/composables/useSetAuth.js";

const { signin, isInvalid } = useSetAuth();
const login = ref({
	name: "",
	password: "",
	userStatus: "user",
});
const formError = ref({
	status: false,
	message: "Please provide your credentials.",
});

const submit = () => {
	if (login.value.name !== "" && login.value.password !== "") {
		signin(login.value);

		formError.value.status = isInvalid.value;
		formError.value.message = "Wrong credentials";
	} else {
		formError.value.status = true;
	}
};
</script>
