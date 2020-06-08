<template>
  <div class="main">
    <div class="pure-g">
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
    <div class="pure-g">
      <div class="pure-u-1-3">
        <h2>Notification Recipients</h2>
        <notification-recipient></notification-recipient>
      </div>
    </div>
  </div>
  
</template>

<script>
import Blacklist from './components/blacklist.vue';
import Whitelist from './components/whitelist.vue';
import filters from './components/filters.vue';
import notification_recipient from './components/notification_recipient.vue';
export default {
  name: 'App',
  components: {
    "black-list": Blacklist,
    "white-list": Whitelist,
    "notification-recipient": notification_recipient,
    filters,
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
