import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "dayjs/locale/zh-cn";
import App from "./app.vue";
import "element-plus/theme-chalk/dark/css-vars.css";
import { ElCollapseTransition } from "element-plus";
import "element-plus/theme-chalk/base.css";

const app = createApp(App);

const pinia = createPinia();

app.config.errorHandler = err => {
  console.log("------捕获组件抛出的错误", err);
};

app.component(ElCollapseTransition.name, ElCollapseTransition);

// 挂载路由
app.use(router);

// 添加pinia状态管理器
app.use(pinia);

// TODO:注册全局组件
// 注意：全局注册的组件无法被tree shaking
// app.component("Compo",Compo)

// 挂载根应用
app.mount("#root");
