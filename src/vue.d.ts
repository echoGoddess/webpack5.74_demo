declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

// TODO:增强组件实例类型，以支持自定义全局属性
// declare module "vue" {
//   interface ComponentCustomProperties {}
// }

// 定义应用内抛出的未捕获错误
interface AppConfig {
  errorHandler?: (
    error: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => void;
}
