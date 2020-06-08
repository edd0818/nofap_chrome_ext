import _ from 'lodash';
const utils = {
  sendFappingNotification : _.debounce((recipient) => {
    if (recipient && recipient.length > 0){
      let data = new FormData();
      data.append('recipient', recipient.join(','));
      fetch("https://script.google.com/macros/s/AKfycbwBXUhDlOpW1_sr_ij8p5DwJ1Ph0ZJCDScuYRO5rLaYrQ5-98gF/exec"
      , {method: 'POST', body: data});
    }
    
  }, 30000)
};

export { utils };
