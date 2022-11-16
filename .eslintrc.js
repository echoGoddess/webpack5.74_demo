module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // extends: [
  //   // 'plugin:vue/vue3-essential', // vue默认规则
  //   // 'airbnb-base', // eslint 默认规则
  // ],
  extends: [
    'eslint:recommended', //继承Eslint中推荐的（打钩的）规则项http://eslint.cn/docs/rules/
    'plugin:vue/essential', // 此项是用来配置vue.js风格
    'prettier',//把prettier中设置的规则添加进来，让它覆盖上面设置的规则。这样就不会和上面的规则冲突了
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    'prettier'
  ],
  rules: {
    "prettier/prettier": "error",
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index"], //需要忽略的组件名
      },
    ],
  },
};
