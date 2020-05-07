<template>
  <div>
    <input v-model="newRule" />
    <button @click="addRule()">add</button>
    <table>
      <tr v-for="(item,idx) in blacklist" :key="item.index">
        <td>  
          {{item}}
        </td>
        <td><button @click="removeRule(idx)">remove</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as store from '../../store/store';
export default {
  // eslint-disable-next-line vue/no-shared-component-data
  data () {
    return {
      newRule: null
    }
  },
  created (){
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
    removeRule (index) {
      if (index) {
        store.actions.removeUrlFromBlacklist(index);
      }
    }
  }
};
</script>

<style scoped></style>
