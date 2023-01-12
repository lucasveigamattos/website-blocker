function setLocalStorageVariable(variableName, variableValue) {
    const valueToBeSaved = {}
    valueToBeSaved[variableName] = variableValue // ejects the variableName value as a key into the object, and the variableValue as the value
    chrome.storage.local.set(valueToBeSaved)
}

export default setLocalStorageVariable