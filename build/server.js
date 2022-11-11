// 后端服务器
const express = require("express");
const session = require("express-session");
const app = new express();
const bodyParser = require("body-parser");
const qs = require("querystring");
const cors = require("cors");
const router = require("./router");

// 全局注册session
app.use(session({
    secret:'express-session',
    resave:false,
    saveUninitialized:true
}));

// 注册urlencoded中间件，解析表单参数 application/x-www-form-urlencoded格式的
app.use(express.urlencoded({extended:false}));
// 注册json中间件，可接受body传参
app.use(express.json())
// 注册支持请求跨域中间件
app.use(cors());

// 注册全局中间件:路由模块
app.use("/api",router);

// 注册全局中间件
app.use(function(req,res,next){
    let str = "";
    // 监听请求的data事件
    req.on("data",(chunk)=>{
        str+=chunk;
    });

    // 监听请求结束事件
    req.on("end",()=>{
        // str中保存的就是完整的请求参数字符串
        const body=qs.parse(str)

        req.body = body;

        console.log("--------body",req.body);
        res.send("hello express")
        next()  
    });
})

console.log("start server 8080");
app.listen(8080,(err)=>{
    console.log("----------server error",err);
    return err;
});