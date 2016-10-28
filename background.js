var apply = false;

chrome.storage.local.get(['apply'], function (data) {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
    }
    apply = data.apply;
});

chrome.tabs.onUpdated.addListener(function (tabId) {
    if (apply) chrome.tabs.executeScript(tabId, {code:'document.documentElement.classList.add("custom-color")',runAt:'document_start'});
});

chrome.storage.onChanged.addListener(function () {
    apply = !apply;
    chrome.tabs.query({currentWindow: true}, function (tabs) {
        tabs.forEach(function (tab) {
            chrome.tabs.executeScript(tab.id, {code: 'document.documentElement.classList.toggle("custom-color")', allFrames: true})
        })
    });
});
