import Vue from 'vue';
import * as DEFAULT_SETTINGS from '../default_settings.json'


export const state = Vue.observable({
  settings: {
      blacklist : [],
      requestType : []
  },
});
export const getters = {
    blacklist: () => state.settings.blacklist,
    requestType: () => state.settings.requestType
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
  }
};

export const actions = {
    fetchDefaultSettings() {
        return new Promise((resolve, reject) => {
            mutations.setSettings(DEFAULT_SETTINGS.default);
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
    }
};