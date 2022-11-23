<template>
  <!-- <el-config-provider :size="size" :z-index="zIndex"> -->
  <div class="content">
    <span>hello vue3</span>
    <!-- <el-button>I am ElButton</el-button> -->
    <router-view v-slot="{ Component, route }">
      <transition :mode="route.meta.mode || 'out-in'">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
  <!-- </el-config-provider> -->
</template>
<script>
import "./style.scss";
import { defineComponent } from "vue";
// import { ElConfigProvider } from "element-plus";

// 熟悉vue的defineComponent和setup概念
// 引入element-plus组件库
export default defineComponent({
  components: {
    // ElConfigProvider
  },
  setup() {
    return {
      zIndex: 3000,
      size: "small"
    };
  }
});
</script>

<style lang="scss">
.content {
  color: tomato;
}
</style>
