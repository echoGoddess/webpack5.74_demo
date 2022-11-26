<template>
  <el-config-provider :locale="locale" :size="size" :z-index="zIndex">
    <div class="content">
      <span>hello vue3</span>
      <el-button type="primary">Primary2</el-button>
      <router-view v-slot="{ Component, route }">
        <Transition :name="route.meta.mode || 'fade'">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </div>
  </el-config-provider>
</template>

<script setup>
// 使用组合式API+SFC风格开发
import "./style.scss";
import { ref, onMounted } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const zIndex = ref(3000);
const size = ref("small");
const locale = ref(zhCn);

onMounted(() => {
  console.log("----------------app.count111", zIndex, size);
});
</script>

<style lang="scss">
.content {
  color: tomato;
}
</style>
