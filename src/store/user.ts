import { defineStore } from "pinia";
import { login } from "@/api/user";
import { LoginData } from "@/api/user/type";
import Cookies from "js-cookie";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    username: "",
    token: "",
    count: 0,
    isLogin: false
  }),
  // 状态的计算值，相当于computed 属性
  // 还可以定义成一个箭头函数，接受外部传入的参数
  getters: {
    loginCount(): number {
      return this.count++;
    },
    // 不能想getter传递参数，但可以通过返回函数的方式给getter传递参数
    isAdmin: state => {
      return (adminName: string) => state.username === adminName;
    }
  },
  /* 定义业务逻辑
    可以是异步的，可以添加fetch
   */
  actions: {
    async loginUser({ username, password }: LoginData) {
      try {
        const res = await login({ username, password });
        if (res && res.token) {
          this.token = res.token;
          Cookies.set("token", res.token);
          this.username = username;
          this.count++;
          this.isLogin = true;
        }
      } catch (error) {
        return error;
      }
    }
  }
});
