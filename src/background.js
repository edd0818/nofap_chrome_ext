import { settingsUtil } from './mist/utils';
import {actions, getters, mutations} from './store/store'

const onBeforeRequestListener = details => {
  // console.log('onBeforeRequest.', details)
  return { redirectUrl: 'https://www.google.com' };
};
function registerWebRequestListener(settings) {
  chrome.webRequest.onBeforeRequest.addListener(
    onBeforeRequestListener,
    {
      urls: settings.blacklist,
      types: settings.request_type,
    },
    ['blocking']
  );
}
chrome.runtime.onInstalled.addListener(function() {
  console.log("onInstalled.");
  // Storing default settings if thers's no stored settings
  actions.fetchSettings()
  .then(settings => {
    if(!settings) {
      actions.fetchDefaultSettings()
        .then(defaultSettings => {
          console.log("Fetching Default settings.", defaultSettings);
          actions.updateSettings(defaultSettings);
        })
    }
  });
});
chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log("Storage Changed.");
  actions.fetchSettings().then(settings => {
    if(settings) {
      // remove origin listener
      if (chrome.webRequest.onBeforeRequest.hasListener(onBeforeRequestListener)) {
        chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestListener);
      }
      if (settings.blacklist.length > 0) {
        // re-register listener with new settings
        registerWebRequestListener(settings);
        console.log("Re-register listener.");
      }
    }
  });
});
// Initializing Web-Request listener.
actions.fetchSettings().then(settings => {
  if (settings) {
    registerWebRequestListener(settings);
  }
})

