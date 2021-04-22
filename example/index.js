import { Core as SDK } from '../assetory/index.js';

const spinnerElement = document.getElementById("spinner");
const userNameInputElement = document.getElementById("userNameInput");
const startGameButton = document.getElementById("startButton");
const connectButtonElemment = document.getElementById("connectButton");
const loginButtonElemment = document.getElementById("loginButton");
const gatherButtonElemment = document.getElementById("gatherButton");
const outputElement = document.getElementById("output");
const validateButtonElement = document.getElementById("validateButton");

const joinSessionButtonElement = document.getElementById("joinSessionButton");

const sdk = new SDK({ devmode: true, projectId: "a2270c33-15e9-4e14-978a-135ef380b1f5" });

outputElement.innerHTML = JSON.stringify(sdk, null, 4);

console.log(window.apiURL)

// A function to handle metadata changes
function refreshMeta(target, response)
{
    outputElement.innerHTML = JSON.stringify(sdk, null, 4);

    target.classList.add(response.success === true ? "success" : "failure");
    target.disabled = true;

    spinnerElement.style.display = "none";
}

connectButtonElemment.onclick = (event) =>
{
    spinnerElement.style.display = "block";

    sdk.connect((response) =>
    {
        console.log(sdk);
        refreshMeta(event.target, response);
    });
}

loginButtonElemment.onclick = (event) =>
{
    spinnerElement.style.display = "block";

    sdk.login({ name: userNameInputElement.value }, (response) =>
    {
        refreshMeta(event.target, response);
    });
}

gatherButtonElemment.onclick = (event) =>
{
    spinnerElement.style.display = "block";

    sdk.gather((response) =>
    {
        refreshMeta(event.target, response);
    });
}

validateButtonElement.onclick = (event) =>
{
    spinnerElement.style.display = "block";

    sdk.validate((response) =>
    {
        refreshMeta(event.target, response);
    });
}

joinSessionButtonElement.onclick = (event) =>
{
    spinnerElement.style.display = "block";

    sdk.joinSession((response) =>
    {
        console.log(response);
        refreshMeta(event.target, response);
    });
}
