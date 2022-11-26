<template>
  <div>Login<el-button type="primary" @click="login">login</el-button></div>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({ name: "", password: "" });
function login() {
  console.log("--------login", state);
}
</script>
<style lang="scss" scoped></style>
