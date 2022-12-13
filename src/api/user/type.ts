/**定义请求和响应参数的类型 */

/**登录接口请求参数类型 */
export interface LoginData {
  username: string;
  password: string;
}

/**登录接口响应数据类型 */
export interface LoginRes {
  token: string;
}
