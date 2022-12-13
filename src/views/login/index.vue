<template>
  <h1>WEBPACK5 && VUE3</h1>
  <div class="loginContainer">
    <el-form
      ref="loginForm"
      :model="userInfo"
      label-width="80px"
      label-position="left"
      :rules="rules"
      size="default"
      class="loginForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          v-model="userInfo.name"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="userInfo.password"
          placeholder="请输入密码"
          type="password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login(loginForm)">登录</el-button>
        <el-button type="primary" @click="reset(loginForm)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import router from "@/router";

interface UserInfo {
  name: string;
  password: string;
}

const loginForm = ref<FormInstance>();

const userInfo = reactive<UserInfo>({ name: "", password: "" });

const validateName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "请输入用户名",
      validator: validateName,
      trigger: "blur"
    }
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const login = (formEl: FormInstance | undefined) => {
  router.push("/home");
};

const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 30px;
  padding: 50px 0;
}
.loginContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  .loginForm {
    padding: 50px;
    border-radius: 10px;
    border: 1px solid grey;
  }
}
</style>
