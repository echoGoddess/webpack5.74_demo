import { createApp } from "vue";
import router from "./router";
import ElementPlus from "element-plus";
import App from "./app.vue";

const app = createApp(App);

app.config.errorHandler = err => {
  console.log("------捕获组件抛出的错误", err);
};

// 引入组件库
app.use(ElementPlus, { size: "small", zIndex: 3000 });

// 挂载路由
app.use(router);

// TODO:注册全局组建
// app.component("Compo",Compo)

// 挂载根应用
app.mount("#root");
