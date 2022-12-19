<template>
  <h1>WEBPACK5 && VUE3</h1>
  <div class="loginContainer">
    <el-form
      ref="refLoginForm"
      :model="userInfo"
      label-width="80px"
      label-position="left"
      :rules="rules"
      size="default"
      class="loginForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="userInfo.username"
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
        <el-button type="primary" @click="loginForm(refLoginForm)"
          >登录</el-button
        >
        <el-button type="primary" @click="reset(refLoginForm)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import router from "@/router";
import { useUserStore } from "@/store/user";

const userstore = useUserStore();

interface UserInfo {
  username: string;
  password: string;
}

const refLoginForm = ref<FormInstance>();

const userInfo = reactive<UserInfo>({ username: "", password: "" });

const validateName = (rule: any, value: any, callback: any) => {
  const reg = /^[a-zA-Z]\w{3,15}/;
  if (value === "") {
    callback(new Error("请输入用户名"));
    return;
  }
  if (!reg.test(value)) {
    callback(new Error("请输入4-15位字母"));
    return;
  }
  callback();
};

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      validator: validateName,
      trigger: "blur"
    }
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loginForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean): Promise<void> => {
    if (valid) {
      await userstore.loginUser(userInfo);
      if (userstore.token) {
        router.push("/home");
      }
    } else {
      ElMessage.error("验证失败");
    }
  });
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
