<template>
  <div class="content">
    hello vue3
    <router-view v-slot="{ Component, route }">
      <transition :mode="route.meta.mode || 'out-in'">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script>
import "./style.scss";

export default {};
</script>

<style lang="scss">
.content {
  color: tomato;
}
</style>
