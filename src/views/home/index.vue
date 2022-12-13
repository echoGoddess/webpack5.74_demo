<template>
  <h1>主 页</h1>
</template>
<script setup lang="ts">
import { reactive } from "vue";

interface InterF {
  name: string;
}

const interF: InterF = reactive({ name: "typescript" });
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 30px;
  padding: 50px 0;
}
</style>
