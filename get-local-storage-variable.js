function getLocalStorageVariable(variableName) {
    return chrome.storage.local.get([variableName])
        .then(promiseResult => {
            return promiseResult[variableName]
        })
}

export default getLocalStorageVariable