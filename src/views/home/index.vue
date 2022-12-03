<template>
  <div>Home
    <h2>{{interF.name}}</h2>
  </div>
</template>
<script setup lang="ts">

import {reactive} from "vue";

interface InterF{
  name:string
}

const interF:InterF = reactive({name:"typescript"});

</script>
<style lang="scss" scoped></style>
