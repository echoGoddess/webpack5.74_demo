// 删除console的loader
// source是指要处理的内容
const reg = /(console.log()(.*)())/g;

module.exports = function (source) {
  // 清除所有js文件中的console
  const result = source.replace(reg, "");
  // 返回处理完的结果
  return result;
};
