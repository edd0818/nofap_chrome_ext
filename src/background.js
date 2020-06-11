import {state, actions, getters, mutations} from './store/store';
import {GASUtils} from './mist/utils';
import messageType from './mist/messageType'
const onBeforeRequestListener = details => {
  let url = new URL(details.url);
  let reUrl = chrome.runtime.getURL("home/home.html");;
  let needToBlock = false;

  // check if url is in the whitelist first
  if (!state.settings.whitelist.includes(url.hostname)) {
    needToBlock = state.settings.blacklist.includes(url.hostname);
    for (var i = 0; i < state.settings.filters.length; i++) {
      if (needToBlock) {
        break;
      }
      let filter = state.settings.filters[i];
      let regex = new RegExp(filter, 'gi');
      needToBlock = regex.test(url.hostname);
    }
  }
  if (needToBlock) {
    GASUtils.sendFappingNotification(state.settings.notification_recipient);
  }
  return { redirectUrl: needToBlock ? reUrl : null };
};

function registerWebRequestListener(settings) {
  chrome.webRequest.onBeforeRequest.addListener(
    onBeforeRequestListener,
    {
      urls: ['http://*/*', 'https://*/*'],
      types: settings.request_type,
    },
    ['blocking']
  );
  console.log("Register listener.");
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
        console.log("Removed listener.")
      }
      if (settings.blacklist.length > 0) {
        // re-register listener with new settings
        registerWebRequestListener(settings);
      }
    }
  });
});
chrome.runtime.onMessage.addListener(function(request, sender) {

  if (request.type == messageType.BLOCK_FROM_CONTENT_SCRIPT) {
    GASUtils.sendFappingNotification(state.settings.notification_recipient);
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
  }
});

// Initializing Web-Request listener.
actions.fetchSettings().then(settings => {
  if (settings) {
    registerWebRequestListener(settings);
  }
});