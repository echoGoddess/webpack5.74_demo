import _ from "lodash";
import "jquery";
import "./style.scss";
import imgBaby from "./assets/images/baby.jpg";
import {printMe} from "./print";

class Layout{
  static b =2;
  constructor(){
    this.a= 1;
    
  }
}
const layout = new Layout();
console.log(layout);

function component() {
    var element = document.createElement('div');
    const eleSpan = document.createElement('span');
    const eleImg = document.createElement('img');
    const eleBtn = document.createElement("button");

    // element.innerHTML = _.join(['Hello', 'webpack','Hello', 'webpack','Hello', 'webpack','Hello', 'webpack'], ' ');
    element.classList.add("hello")

    eleSpan.innerHTML= _.join(["你好","webpack5"]," ");
    element.appendChild(eleSpan);

    eleImg.src= imgBaby;
    element.appendChild(eleImg);

    eleBtn.innerHTML="click Me"
    eleBtn.onclick = printMe;
    element.appendChild(eleBtn);
  
    return element;
  }
  
  // document.body.appendChild(component());
  let element = component();
  document.body.appendChild(element); // 当print.js更改导致页面重新渲染时，重新获取页面元素

  if(module.hot){
    module.hot.accept('./print.js',function(){
      console.log("Accepting the updated printMe module!");
      // printMe();
      document.body.removeChild(element);
      element = component();
      document.body.appendChild(element); // 当页面重新渲染后,component更新click事件
    })
  }

  // if("serviceWorder" in window.navigator){
  //   window.addEventListener("load",()=>{
  //     window.navigator.serviceWorker.register()
  //   })
  // }

  function  test(){
    return new Promise((resolve,reject)=>{
      resolve(124)
    });
  }

  test();

  const arr = [1,2,3,4].map((item)=>item*item);
  const hasNum = (num)=>[4,5,6,7,8].includes(num);
  const hasNum1 = (num)=>[4,5,6,7,8,9].includes(num);

  console.log("-------------------babel",test(),arr,hasNum(2),hasNum1(3));
