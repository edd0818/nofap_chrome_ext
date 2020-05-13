<template>
  <div class="main pure-g">
    <div class="pure-u-1 header">
      <div class="pure-g">
        <div class="pure-u-1-5 icon-container"><img width="30px" :src="iconUrl" /></div>
        <div class="pure-u-4-5"><p>No Fap</p></div>
      </div>
      
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
    return {
      iconUrl: chrome.extension.getURL("icons/icon_128.png"),
      hasThisSite: false,
      }
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
.main {
  width: 200px;
  height: 100px;
  margin: 10px;
}
.main .header {
  margin-bottom: 5px;
  border-bottom: 1px solid #a5a5a5;
}
.main p {
  margin: 10px 0;
  font-size: 15px;
}
.icon-container {
  position: relative;
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
.block-button{
  width: 100%
}
</style>
