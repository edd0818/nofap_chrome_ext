const DEFAULT_SETTINGS_PATH = 'default_settings.json';

const settingsUtil = {
  set: (settings, callback) => {
    chrome.storage.sync.set(settings, function() {
      if (callback) {
        callback();
      }
    });
  },
  get: callback => {
    const params = {
      blacklist: [],
      request_type: [],
    };
    chrome.storage.sync.get(params, callback);
  },
  /**
   * Retreive default settings from static json file.
   * @param {function} callback The function to be invoked when fetching data successfully.
   */
  getDefault: callback => {
    const default_settings_url = chrome.runtime.getURL(DEFAULT_SETTINGS_PATH);
    fetch(default_settings_url)
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
