<template>
  <h1>主 页</h1>
  <div>登录状态：{{ user.isLogin }}</div>
  <div>登录用户:{{ user.username }}</div>
  <div>登录次数：{{ user.count }}</div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { onUnmounted } from "vue";

const user = useUserStore();

// 订阅userStore的action
// todo:目前没啥用，只是练手的
const unsubscribe = user.$onAction(
  ({
    name, // action 的名字
    store, // store 实例
    args, // 调用这个 action 的参数
    after, // 在这个 action 执行完毕之后，执行这个函数
    onError // 在这个 action 抛出异常的时候，执行这个函数
  }) => {
    // 记录开始的时间变量
    const startTime = Date.now();
    // 这将在 `store` 上的操作执行之前触发
    console.log(`Start "${name}" with params [${args.join(", ")}].`);

    // 如果 action 成功并且完全运行后，after 将触发。
    // 它将等待任何返回的 promise
    after(result => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      );
    });

    // 如果 action 抛出或返回 Promise.reject ，onError 将触发
    onError(error => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      );
    });
  }
);

onUnmounted(() => {
  unsubscribe();
});
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 30px;
  padding: 50px 0;
}
div {
  text-align: center;
}
</style>
"
