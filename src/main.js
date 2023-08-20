import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/routes";
import checkAuth from "@/plugins/checkAuth";

const app = createApp(App);
app.use(router);
app.use(checkAuth);

app.mount("#app");
