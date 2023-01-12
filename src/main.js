import getLocalStorageVariable from "./get-local-storage-variable.js"
import setLocalStorageVariable from "./set-local-storage-variable.js"

const toggleExtension = document.getElementById("toggleExtension")
const websiteNameListInput = document.getElementById("websiteNameInput")
const submitButton = document.getElementById("submitButton")
const websitesToBlockList = document.getElementById("websitesToBlockList")

addEventListener("load", async () => {
    updateExtensionInfo()
})

toggleExtension.addEventListener("click", toggleExtensionOnAndOff)
submitButton.addEventListener("click", addWebsiteToBlockList)

async function updateExtensionInfo() {
    const isApplicationOn = await getLocalStorageVariable("isApplicationOn")
    const arrayOfWebsitesToBlock = await getLocalStorageVariable("arrayOfWebsitesToBlock")
    
    if (isApplicationOn) {
        toggleExtension.classList.add("active")
    } else {
        toggleExtension.classList.remove("active")
    }

    websitesToBlockList.innerHTML = ""

    for (const websiteURL of arrayOfWebsitesToBlock) {
        const li = document.createElement("li")
        const removeWebsiteButton = document.createElement("button")

        li.innerText = websiteURL
        li.classList.add("websiteURL")

        removeWebsiteButton.innerText = "X"
        removeWebsiteButton.classList.add("removeWebsiteButton")
        removeWebsiteButton.addEventListener("click", removeWebsiteFromBlockList)

        li.appendChild(removeWebsiteButton)
        websitesToBlockList.appendChild(li)
    }
}

async function toggleExtensionOnAndOff() {
    const isApplicationOn = await getLocalStorageVariable("isApplicationOn")

    if (isApplicationOn) {
        setLocalStorageVariable("isApplicationOn", false)
    } else {
        setLocalStorageVariable("isApplicationOn", true)
    }

    updateExtensionInfo()
}

async function addWebsiteToBlockList() {
    const websiteURL = websiteNameListInput.value
    websiteNameListInput.value = ""

    const arrayOfWebsitesToBlock = await getLocalStorageVariable("arrayOfWebsitesToBlock")
    arrayOfWebsitesToBlock.push(websiteURL)
    setLocalStorageVariable("arrayOfWebsitesToBlock", arrayOfWebsitesToBlock)

    updateExtensionInfo()
}

async function removeWebsiteFromBlockList(event) {
    const arrayOfWebsitesToBlock = await getLocalStorageVariable("arrayOfWebsitesToBlock")
    const websiteURL = event.target.parentElement.innerText.slice(0, event.target.parentElement.innerText.length - 2)

    if (arrayOfWebsitesToBlock.includes(websiteURL)) arrayOfWebsitesToBlock.splice(arrayOfWebsitesToBlock.indexOf(websiteURL), 1) // removes the website from block list
    setLocalStorageVariable("arrayOfWebsitesToBlock", arrayOfWebsitesToBlock)

    updateExtensionInfo()
}