<template>
  <div>
    <input v-model="newFilter" />
    <button @click="addFilter()">add</button>
    <table>
      <tr v-for="(item,idx) in filters" :key="item.index">
        <td>  
          {{item}}
        </td>
        <td><button @click="removeFilter({name: item, id: idx})">remove</button></td>
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
      newFilter: null
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
    filters: () => store.state.settings.filters,
  },
  methods : {
    addFilter () {
      if (this.newFilter) {
          store.actions.addFilter(this.newFilter);
          this.newFilter = null;
        }
    },
    removeFilter (filter) {
      if (filter) {
        store.actions.removeFilter(filter.id);
      }
    }
  }
};
</script>

<style scoped></style>
