import { createApp } from "vue";
import App from "./app.vue";

const app = createApp(App);

app.config.errorHandler = err => {
  console.log("------捕获组件抛出的错误", err);
};

// TODO:注册全局组建
// app.component("Compo",Compo)

// 挂在应用
app.mount("#root");
