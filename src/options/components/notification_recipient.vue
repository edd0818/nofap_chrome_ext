<template>
  <div>
    <input v-model="newRecipient" />
    <button @click="addRecipient()">add</button>
    <table>
      <tr v-for="(item,idx) in recipient" :key="item.index">
        <td>  
          {{item}}
        </td>
        <td><button @click="removeRecipient({name: item, id: idx})">remove</button></td>
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
      newRecipient: null
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
    recipient: () => store.state.settings.notification_recipient,
  },
  methods : {
    addRecipient () {
      if (this.newRecipient) {
          store.actions.addRecipient(this.newRecipient.trim());
          this.newRecipient = null
        }
    },
    removeRecipient (item) {
      if (item) {
        store.actions.removeRecipient(item.id);
      }
    }
  }
};
</script>

<style scoped></style>
