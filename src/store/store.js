import Vue from 'vue';
import {default as DEFAULT_SETTINGS} from '../default_settings.json'


export const state = Vue.observable({
  settings: {
      requestType : [],
      filters: [],
      blacklist : [],
      whitelist: [],
      notification_recipient: []
  }
});
export const getters = {

};
export const mutations = {
  setSettings(settings) {
      state.settings = settings
  },
  setBlacklist(newBL) {
    state.settings.blacklist = newBL;
  },
  addUrlToBlacklist(url) {
    state.settings.blacklist.push(url);
    //   console.log(state.settings.blacklist);
  },
  removeUrlFromBlacklist(idx) {
    state.settings.blacklist.splice(idx,1);
    // console.log(idx,state.settings.blacklist)
  },
  addUrlToWhitelist(url) {
    state.settings.whitelist.push(url);
    //   console.log(state.settings.blacklist);
  },
  removeUrlFromWhitelist(idx) {
    state.settings.whitelist.splice(idx,1);
    // console.log(idx,state.settings.blacklist)
  },
  addFilter(filter) {
    state.settings.filters.push(filter);
    //   console.log(state.settings.blacklist);
  },
  removeFilter(idx) {
    state.settings.filters.splice(idx,1);
    // console.log(idx,state.settings.blacklist)
  },
  addRecipient(recipient) {
    state.settings.notification_recipient.push(recipient);
    //   console.log(state.settings.blacklist);
  },
  removeRecipient(idx) {
    state.settings.notification_recipient.splice(idx,1);
    // console.log(idx,state.settings.blacklist)
  }
};

export const actions = {
    fetchDefaultSettings() {
        return new Promise((resolve, reject) => {
            mutations.setSettings(DEFAULT_SETTINGS);
            resolve(state.settings);
        });
    },
    fetchSettings() {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(["settings"], result => {
                // console.log(result.settings);
                if (result.settings) {
                    mutations.setSettings(result.settings);
                }
                resolve(result.settings);
            });
        })
    },
    updateSettings(settings) {
        return new Promise(resolve => {
            mutations.setSettings(settings);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                // console.log("Settings has been stored.", state.settings)
                resolve();
            });
        })
    },
    updateBlacklist(blacklist) {
        return new Promise(resolve => {
            mutations.setBlacklist(blacklist);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                resolve();
            });
        })
    },
    addUrlToBlackList(url) {
        return new Promise(resolve => {
            mutations.addUrlToBlacklist(url);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                resolve();
            });
        });
    },
    removeUrlFromBlacklist(idx) {
        return new Promise(resolve => {
            mutations.removeUrlFromBlacklist(idx);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                resolve();
            });
        })
    },
    addUrlToWhitelist(url) {
        return new Promise(resolve => {
            mutations.addUrlToWhitelist(url);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                resolve();
            });
        });
    },
    removeUrlFromWhitelist(idx) {
        return new Promise(resolve => {
            mutations.removeUrlFromWhitelist(idx);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                resolve();
            });
        })
    },
    addFilter(filter) {
        return new Promise(resolve => {
            mutations.addFilter(filter);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                resolve();
            });
        });
    },
    removeFilter(idx) {
        return new Promise(resolve => {
            mutations.removeFilter(idx);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                resolve();
            });
        })
    },
    addRecipient(recipient) {
        return new Promise(resolve => {
            mutations.addRecipient(recipient);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                resolve();
            });
        });
    },
    removeRecipient(idx) {
        return new Promise(resolve => {
            mutations.removeRecipient(idx);
            chrome.storage.sync.set({ settings: state.settings }, function() {
                resolve();
            });
        })
    }
};