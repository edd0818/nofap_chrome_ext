<template>
  <div class="main pure-g">
    <div class="pure-u-1-3">
      <h2>Blacklist</h2>
      <black-list></black-list>
    </div>
    <div class="pure-u-1-3">
      <h2>Whitelist</h2>
      <white-list></white-list>
    </div>
    <div class="pure-u-1-3">
      <h2>Filters</h2>
      <filters></filters>
    </div>
  </div>
  
</template>

<script>
import Blacklist from './components/blacklist.vue';
import Whitelist from './components/whitelist.vue';
import filters from './components/filters.vue';
export default {
  name: 'App',
  components: {
    "black-list": Blacklist,
    "white-list": Whitelist,
    filters
  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
.main {
  margin: 20px;
}
</style>
