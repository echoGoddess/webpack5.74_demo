/**定义请求和响应参数的类型 */

// TODO:规范type定义，并确定定义位置

/**登录接口请求参数类型 */
export interface LoginData {
  username: string;
  password: string;
}

/**登录接口响应数据类型 */
export interface LoginRes {
  token: string;
}
