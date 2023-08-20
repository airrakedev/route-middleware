import useAuth from "@/composables/useSetAuth";
const { setAuthValues } = useAuth();
export default {
	install: (opts) => {
		setAuthValues();
	},
};
