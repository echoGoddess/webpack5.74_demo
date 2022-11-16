const express = require("express");
const router = express.Router();

router.get("/get", (req, res) => {
  const query = req.query;
  res.send({
    status: 0, // 0 成功 1：失败
    message: "GET 请求成功",
    data: query
  });
});

router.post("/post", (req, res) => {
  const body = req.body;
  res.send({
    status: 0, // 0 成功 1：失败
    message: "POST 请求成功",
    data: body
  });
});

// router.post("/login",(req,res)=>{
//     const body = req.body;
//     req.session.user = body;
//     req.session.isLogin = 1;

//     res.send({
//         status:0, // 0 成功 1：失败
//         message:"登陆成功",
//         data:body
//     })
// })

module.exports = router;
