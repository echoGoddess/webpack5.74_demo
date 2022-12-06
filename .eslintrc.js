module.exports = {
  parser:"vue-eslint-parser",
  env: { // 您的环境变量（包含多个预定义的全局变量）
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended', //继承Eslint中推荐的（打钩的）规则项http://eslint.cn/docs/rules/
    'plugin:vue/vue3-recommended',
    "plugin:@typescript-eslint/recommended",
    "prettier",//把prettier中设置的规则添加进来，让它覆盖上面设置的规则。这样就不会和上面的规则冲突了
    './.eslintrc-auto-import.json',
  ],
  overrides: [
  ],
  parserOptions: {
    parser:"@typescript-eslint/parser", // 添加ts解析器
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint', // 添加ts解析规则
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
    // 禁用var
    "no-var":"error",
     // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': [
      "error",
      "interface"
    ],
    // 允许导入没有声明文件的模块
    "@typescript-eslint/no-var-requires":0
  },
};
