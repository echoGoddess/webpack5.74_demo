import { createRouter, createWebHashHistory } from "vue-router";
// import Cookies from "js-cookie";
import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 是否登录
// const isLogin = Cookies.get("token");

// 全局前置钩子
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth && !isLogin && to.name !== "Login") {
//     return { name: "Login" };
//   } else {
//     next();
//   }
// });

// 全局后置钩子
router.afterEach((to, from, failure) => {
  if (failure) {
    console.log("----aftereach-failure", failure);
  }
});

// 捕获导航期间抛出的错误
router.onError((to, from) => {
  console.log("------------router-onError", to, from);
});

export default router;
