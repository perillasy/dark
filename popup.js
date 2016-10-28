var switchButton = document.getElementById('switch');

switchButton.addEventListener('click', function () {
    var apply = !switchButton.classList.contains('on');
    chrome.storage.local.set({apply: apply}, function () {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        }
        switchButton.classList.toggle('on');
    })
});

chrome.storage.local.get(['apply'], function (data) {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
    }
    if (data.apply) {
        switchButton.classList.add('on');
    }
});
//
