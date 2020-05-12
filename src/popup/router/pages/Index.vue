<template>
  <div class="main pure-g">
    <div class="pure-u-1 header">
      <p>No Fap</p>
    </div>
    <div class="pure-u-1">
      <button class="pure-button pure-button-primary block-button" @click="blockThisSite()" :class="{'pure-button-disabled': hasThisSite}">{{buttomText}}</button>
    </div>
  </div>
</template>

<script>
import * as store from '../../../store/store';

export default {
  data() {
    return {hasThisSite: false}
  },
  created () {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if(tab.active){
        let url = new URL(tab.url);
        let target = url.origin + '/*';
        self.hasThisSite = store.state.settings.blacklist.includes(target);
      }
    }); 
    store.actions.fetchSettings();
  },
  computed: {
    buttomText() {
      return this.hasThisSite ? 'This Site Is Blocked': 'Block This Site'
    }
  },
  methods: {
    blockThisSite (){
      self = this
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let activeTab = tabs[0];
        let url = new URL(activeTab.url);
        let target = url.origin + '/*'
        if (!store.state.settings.blacklist.includes(target)){
          store.actions.addUrlToBlackList(target);
          self.hasThisSite = true;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
.main {
  width: 200px;
  height: 100px;
  margin: 10px;
}

.block-button{
  width: 100%
}
</style>
