const DEFAULT_SETTINGS_PATH = 'default_settings.json';

const settingsUtil = {
  set: (settings, callback) => {
    chrome.storage.sync.set({ settings: settings }, function() {
      if (callback) {
        callback();
      }
    });
  },
  get: callback => {
    const params = { settings: null };
    chrome.storage.sync.get(params, result => {
      if (callback) {
        callback(result.settings);
      }
    });
  },
  /**
   * Retreive default settings from static json file.
   * @param {function} callback The function to be invoked when fetching data successfully.
   */
  getDefault: callback => {
    const url = chrome.runtime.getURL(DEFAULT_SETTINGS_PATH);
    fetch(url)
      .then(response => response.json()) // assuming file contains json
      .then(json => {
        console.log(json);
        if (callback) {
          callback(json);
        }
      });
  },
};

export { settingsUtil };
