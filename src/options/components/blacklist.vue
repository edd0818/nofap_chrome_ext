<template>
  <div>
    <input v-model="newRule" />
    <button @click="addRule()">add</button>
    <table>
      <tr v-for="(item,idx) in blacklist" :key="item.index">
        <td>  
          {{item}}
        </td>
        <td><button @click="removeRule({name: item, id: idx})">remove</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as store from '../../store/store';
const storedChangedListener = function(changes, namespace) {
  store.actions.fetchSettings();
}
export default {
  // eslint-disable-next-line vue/no-shared-component-data
  data () {
    return {
      newRule: null
    }
  },
  created (){
    if (!chrome.storage.onChanged.hasListener(storedChangedListener)) {
      chrome.storage.onChanged.addListener(storedChangedListener);
    }
    store.actions.fetchSettings().then((settings) => {
      // console.log(settings);
      store.actions.updateSettings(settings);
    });

  },
  computed: {
    blacklist: () => store.state.settings.blacklist,
  },
  methods : {
    addRule () {
      if (this.newRule) {
          store.actions.addUrlToBlackList(this.newRule);
        }
    },
    removeRule (rule) {
      if (rule) {
        store.actions.removeUrlFromBlacklist(rule.id);
      }
    }
  }
};
</script>

<style scoped></style>
