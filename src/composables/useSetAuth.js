import { ref, defineExpose, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

const isAuth = ref(false);
const isAdmin = ref(false);
const isUser = ref(false);
const isInvalid = ref(false);
const accountPath = ref("/user");

export default function useSetAuth() {
	const router = useRouter();

	const userAccount = {
		name: "usertest",
		password: "pass",
	};
	const adminAccount = {
		name: "admintest",
		password: "pass",
	};

	// METHODS
	const signin = ({ name, password, userStatus }) => {
		switch (userStatus) {
			case "user":
				if (userAccount.name === name && userAccount.password === password) {
					isUser.value = true;
					isAdmin.value = false;
					isAuth.value = true;
					isInvalid.value = false;
				} else {
					isInvalid.value = true;
				}
				break;

			case "admin":
				if (adminAccount.name === name && adminAccount.password === password) {
					isUser.value = false;
					isAdmin.value = true;
					isAuth.value = true;
					isInvalid.value = false;
					accountPath.value = "/admin";
				} else {
					isInvalid.value = true;
				}
				break;
		}
	};

	const setAuthValues = () => {
		let storageValues = localStorage.getItem("userAuth");
		if (!storageValues) return;
		storageValues = JSON.parse(storageValues);
		isUser.value = storageValues.isUser;
		isAdmin.value = storageValues.isAdmin;
		isAuth.value = storageValues.isAuth;
		accountPath.value = storageValues.accountPath;
	};

	const setAuthStorage = () => {
		localStorage.setItem(
			"userAuth",
			JSON.stringify({
				isUser: isUser.value,
				isAdmin: isAdmin.value,
				isAuth: isAuth.value,
				accountPath: accountPath.value,
			})
		);
	};

	const logout = () => {
		isAuth.value = false;
		isAdmin.value = false;
		isUser.value = false;
		isInvalid.value = false;
		accountPath.value = "/user";
		router.push({ path: accountPath.value });
	};

	// WATCHER
	watch(
		() => isAuth.value,
		async (v) => {
			// set localStorage values
			setAuthStorage();
			if (v) {
				if (router) {
					await router.push({ path: accountPath.value });
				}
			}
		}
	);

	// MOUNTED
	onMounted(() => {
		setAuthStorage();
	});

	return {
		signin,
		isAdmin,
		isAuth,
		isUser,
		accountPath,
		isInvalid,
		setAuthValues,
		logout,
	};

	// defineExpose();
}
