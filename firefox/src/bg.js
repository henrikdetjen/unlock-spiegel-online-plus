function notify(msg) {
    var n = chrome.notifications.create({
        "type": "basic",
        "iconUrl": chrome.extension.getURL("unlock.png"),
        "title": msg.title,
        "message": msg.content
    });
}
chrome.runtime.onMessage.addListener(notify);