// 定义mock请求和响应数据
import Mock from "mockjs";

const prefix = "/api";

Mock.mock(`${prefix}/user/login`, "post", () => {
  return Mock.mock({
    code: 200,
    message: "success",
    data: {
      token: "qwe123"
    }
  });
});
