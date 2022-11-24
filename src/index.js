import { createApp } from "vue";
import router from "./router";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "dayjs/locale/zh-cn";
import App from "./app.vue";
import "element-plus/theme-chalk/dark/css-vars.css";
import { ElCollapseTransition } from "element-plus";
import "element-plus/theme-chalk/base.css";

const app = createApp(App);

app.config.errorHandler = err => {
  console.log("------捕获组件抛出的错误", err);
};

// 引入组件库
app.use(ElementPlus, {
  // 全局配置
  size: "small",
  zIndex: 3000,
  locale: zhCn
});

app.component(ElCollapseTransition.name, ElCollapseTransition);

// 挂载路由
app.use(router);

// TODO:注册全局组建
// app.component("Compo",Compo)

// 挂载根应用
app.mount("#root");
