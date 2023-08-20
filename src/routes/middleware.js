import useSetAuth from "@/composables/useSetAuth.js";

const {
	isAuth,
	accountPath,
	isUser: getUser,
	isAdmin: getAdmin,
} = useSetAuth();

export const checkAuth = ({ to, next }) => {
	if (isAuth.value) {
		return next({ path: accountPath });
	}
	return next();
};

export const isUser = ({ to, next }) => {
	if (!isAuth.value) {
		return next("/login");
	}

	if (!getUser.value) {
		return next("/admin");
	}
	return next();
};

export const isAdmin = ({ to, next }) => {
	if (!isAuth.value) {
		return next("/login");
	}
	if (!getAdmin.value) {
		return next("/user");
	}
	return next();
};

export const setAuth = ({ to, next }) => {
	if (isAuth.value) {
		return next();
	} else {
		return next({ path: "/login" });
	}
};

// Handle middleware logic
export const middlewareHandler = (context, middleware, index) => {
	const nextMiddleware = middleware[index];

	if (!nextMiddleware) {
		return context.next;
	}

	return () => {
		const nextPipeline = middlewareHandler(context, middleware, index + 1);

		return nextMiddleware({ ...context, next: nextPipeline });
	};
};
