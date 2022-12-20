<template>
  <h1>主 页</h1>
  <div>登录状态：{{ user.isLogin }}</div>
  <div>登录用户:{{ user.username }}</div>
  <div>登录次数：{{ user.count }}</div>
  <div>
    <el-input
      ref="input"
      v-model="state.language"
      placeholder="请输入使用的开发语言"
    ></el-input>
    使用语言长度：{{ lenStr
    }}<ElButton type="primary" @click="reset">重置</ElButton>
  </div>
</template>
<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  nextTick,
  computed,
  watch,
  watchEffect
} from "vue";
import { useUserStore } from "@/store/user";

const user = useUserStore();
const input: any = ref(null);

// 响应式 reactive定义的状态，仅对对象类型有效，不能定义成boolean、string、number这样的原始类型
// 在给属性赋值、结构时，会失去响应，因为VUE是通过属性访问进行追踪的，必须保持相同引用
const state = reactive({ language: "ts" });

// ref就是支持原始类型响应的状态定义方式
// 定义对象类型后，不会因为解构而失去响应
// const stateRef = ref("ts");

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

const reset = (): void => {
  state.language = "typescript";
  nextTick(() => {
    console.log("访问状态更新后DOM");
  });
};

/*
  计算属性
// 随响应式状态变化而变化
// 和功能一样的函数的区别：计算属性是可缓存的，只要响应式状态不变，计算属性就会直接返回结果，而函数每次都会重新执行
// 不应该有任何副作用（不在getter中更改DOM 或 请求接口）
// 可写，通过get和set实现，尽量不要使用set，计算属性应该是只读的
*/
const lenStr = computed<number>(() => {
  return state.language.length;
});

/**
 * watch侦听
 * 可以侦听响应式状态、计算属性、多个数据源()=>[]
 * 相对于计算属性，在这里可以处理一些副作用，更改DOM\请求接口
 */
watch(
  () => state.language,
  language => {
    console.log("--------------state.language的长度", language.length);
  },
  {
    deep: false // 是否转化未深层侦听器
  }
);
// 深层侦听器：会侦听响应式状态的所有属性，开销很大，使用大型数据结构时，要注意
// watch(input, () => {
//   console.log("--------------input的长度", input.value, state.language.length);
// });

/**
 * 立即执行的侦听器
 * 会在副作用发生期间追踪（会追踪await执行前的属性）
 */
watchEffect(() => {
  if (input.value) {
    input.value.focus();
    console.log(
      "--------------input的长度",
      input.value,
      state.language.length
    );
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
});

onMounted(() => {
  if (input.value) input.value.focus();
});

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
