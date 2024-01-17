<script setup>
  import MyHeader from './components/Header/Header.vue';
  import Foot from './components/Foot/Foot.vue';
  import { RouterView } from 'vue-router';

</script>

<template>
    <MyHeader/>
    <main id="main">
      <RouterView/>
    </main>
    <Foot/>
</template>