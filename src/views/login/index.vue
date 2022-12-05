<template>
  <div>
    Login
    <el-button type="primary" @click="login">login</el-button>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";

interface UserInfo {
  name: string;
  password?: number;
}

const userInfo: UserInfo = reactive({ name: "" });

function login() {
  console.log("--------login", userInfo);
}
</script>

<style lang="scss" scoped></style>
