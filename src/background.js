import getLocalStorageVariable from "./get-local-storage-variable.js"
import getCurrentTab from "./get-current-tab.js"
import setLocalStorageVariable from "./set-local-storage-variable.js"

chrome.runtime.onInstalled.addListener(initializeExtensionOnIstall)
chrome.tabs.onUpdated.addListener(blockTab)

async function initializeExtensionOnIstall() {
    const arrayOfWebsitesToBlock = await getLocalStorageVariable("arrayOfWebsitesToBlock") ?? []
    setLocalStorageVariable("arrayOfWebsitesToBlock", arrayOfWebsitesToBlock)
    setLocalStorageVariable("isApplicationOn", true)

    chrome.contextMenus.create({
        id: "sampleContextMenu",
        title: "Sample Context Menu",
        contexts: ["selection"]
    })
}

async function blockTab(tabId) {
    const currentTab = await getCurrentTab()
    const isApplicationOn = await getLocalStorageVariable("isApplicationOn")
    const arrayOfWebsitesToBlock = await getLocalStorageVariable("arrayOfWebsitesToBlock")

    for (const websiteURL of arrayOfWebsitesToBlock) {
        if (currentTab.url.includes(websiteURL) && isApplicationOn) {
            chrome.scripting.executeScript({
                target: {tabId},
                func: () => {location.href = "https://lucasveigamattos.github.io/blocked/"}
            })
        }
    }
}