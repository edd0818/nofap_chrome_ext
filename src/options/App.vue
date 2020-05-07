<template>
  <div>
    <black-list></black-list>
  </div>
</template>

<script>
import Blacklist from './components/blacklist.vue';
export default {
  name: 'App',
  components: {
    "black-list": Blacklist
  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
