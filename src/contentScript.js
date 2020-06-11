import {HTMLUtil, GASUtils} from './mist/utils';
import messageType from './mist/messageType';

import {default as keywords} from './adult_keywords.json'
import {state, actions, getters, mutations} from './store/store';

let pageInfo = HTMLUtil.getMetaInfos(document, 'title', 'description', 'keyword');
pageInfo.push(document.title);

const keywordsRegex = new RegExp(keywords.join('|'), 'gi');
let isAdultContent = keywordsRegex.test(pageInfo.join(' '));

if (isAdultContent) {
    document.getElementsByTagName('body')[0].innerHTML += 
            "<div style='opacity:0.95; filter: alpha(opacity=30); background-color:#000;" +
            "width:100%; height:100%; z-index:10; top:0; left:0; position:fixed; '></div>";
    // redirect to no-fap home page.
    const homePageUrl = chrome.runtime.getURL("home/home.html");
    chrome.runtime.sendMessage({type: messageType.BLOCK_FROM_CONTENT_SCRIPT, redirect: homePageUrl});
}
