// 封装用户相关的API

import { http } from "@/utils/request";

import { LoginData, LoginRes } from "./type";

export function login(data: LoginData) {
  return http.post<LoginRes>("/user/login", data);
}
