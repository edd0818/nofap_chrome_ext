import { settingsUtil } from './mist/utils';

const onBeforeRequestListener = details => {
  // console.log('onBeforeRequest.', details)
  return { redirectUrl: 'https://www.google.com' };
};
chrome.runtime.onInstalled.addListener(function() {
  // Storing default settings if thers's no stored settings
  settingsUtil.get(settings => {
    if (!settings) {
      settingsUtil.getDefault(default_settings => {
        settingsUtil.set(default_settings, () => console.log('Save default settings successfully.'));
      });
    }
  });
});
chrome.storage.onChanged.addListener(function(changes, namespace) {
  settingsUtil.get(settings => {
    if (settings) {
      // remove origin listener
      if (chrome.webRequest.onBeforeRequest.hasListener(onBeforeRequestListener)) {
        chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestListener);
      }
      // re-register listener with new settings
      chrome.webRequest.onBeforeRequest.addListener(
        onBeforeRequestListener,
        {
          urls: settings.blacklist,
          types: settings.request_type,
        },
        ['blocking']
      );
    }
  });
});

settingsUtil.get(settings => {
  //   console.log(settings)
  if (settings) {
    chrome.webRequest.onBeforeRequest.addListener(
      onBeforeRequestListener,
      {
        urls: settings.blacklist,
        types: settings.request_type,
      },
      ['blocking']
    );
  } else {
    console.error("Unable to register 'onBeforeRequest' because the settings is not found.");
  }
});
