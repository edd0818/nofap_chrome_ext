import _ from 'lodash';
const GASUtils = {
  sendFappingNotification : (recipient) => {
    if (recipient && recipient.length > 0){
      let data = new FormData();
      data.append('recipient', recipient.join(','));
      return fetch("https://script.google.com/macros/s/AKfycbwBXUhDlOpW1_sr_ij8p5DwJ1Ph0ZJCDScuYRO5rLaYrQ5-98gF/exec"
      , {method: 'POST', body: data});
    }else {
      Promise.reject("Recipient is empty.")
    }  
  }
};

const HTMLUtil = {
  getMetaInfos: (doc, ...targets) => {
    const metas = doc.getElementsByTagName('meta');
    const regex = new RegExp(targets.join('|'));
    let infos = []
    for (let i = 0; i < metas.length; i++) {
        let name = metas[i].getAttribute('name');
        let content = metas[i].getAttribute('content');
        if (regex.test(name) && !infos.includes(content)) {
            infos.push(content);
        }
    }
    return infos;
  }
}

export {GASUtils,  HTMLUtil};
