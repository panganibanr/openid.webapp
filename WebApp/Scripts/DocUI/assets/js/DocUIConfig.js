   var EMRSconfig = {
       clientId: "f1883f37-e7df-4e6b-9df9-24cbcb45ab48",
       authority: "https://login.microsoftonline.com/f610c0b7-bd24-4b39-810b-3dc280afb590",
       redirectUri: "https://localhost:44326/",
       scopes: ["api://75deca06-ae07-4765-85c0-23e719062833/access_as_user"]
};

var loginRequest = {
    scopes: ["User.Read", "Mail.Read"],
    loginHint: "panganibanr@who.int"
};
const msalConfig = {
    auth: {
        clientId: EMRSconfig.clientId,
        authority: EMRSconfig.authority,
        redirectUri: EMRSconfig.redirectUri
    },
    cache: {
        cacheLocation: "sessionStorage",  //This configures where your cache will be stored
        storeAuthStateInCookie: false  // Set this to "true" if you are having issues on IE11 or Edge
    }
};

const myMSALObj = new msal.PublicClientApplication(msalConfig);
let username = "";
function handleResponse(resp) {

    if (resp !== null) {
        setComponentUsername(resp.account.username);
    }
    else {
        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts === null || currentAccounts.length == 0)
            myMSALObj.loginRedirect(loginRequest);
        else {
            setComponentUsername(currentAccounts[0].username);
        }
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    myMSALObj.handleRedirectPromise().then(handleResponse).catch(err => {
        alert(err);
    });
});

function setComponentUsername(un) {
setdocumentlistConfiguration();
setFilterbyConfiguration();
setdocumentuploadConfiguration();
var documentlistcmp = document.querySelector('document-list');
var filterbycmp = document.querySelector('filter-by');
var documentuploadcmp = document.querySelector('document-upload');
if (documentlistcmp && documentlistcmp.data && documentlistcmp.data.msalConfig) {
    documentlistcmp.data.msalConfig.msalInstance = myMSALObj;
    documentlistcmp.data.msalConfig.username = un;
}
if (filterbycmp && filterbycmp.data && filterbycmp.data.msalConfig) {
    filterbycmp.data.msalConfig.msalInstance = myMSALObj;
    filterbycmp.data.msalConfig.username = un;
}
if (documentuploadcmp && documentuploadcmp.data && documentuploadcmp.data.msalConfig) {
    documentuploadcmp.data.msalConfig.msalInstance = myMSALObj;
    documentuploadcmp.data.msalConfig.username = un;
}
}


function setdocumentlistConfiguration() {
    // document-list component arguments 
    var documentlistcmp = document.querySelector('document-list');
    if (documentlistcmp && !documentlistcmp.data) {
        documentlistcmp.data = {
            "defaultFilter": "",
            "documentListdata": false, //Load document-list if value will be true
            "userCanClearDefaultFilter": true, //able to Clear Applied defaultFiter if value will be true
            "baseApiUrl": "https://portal-test.who.int/ems-core-api/api/",
				"msalConfig": {
                    "scopes": "api://75deca06-ae07-4765-85c0-23e719062833/access_as_user",
                    "username": "panganibanr@who.int"
				}
        }
    }
}

function setFilterbyConfiguration() {
    // filter-by component arguments 
    var filterbycmp = document.querySelector('filter-by');
    if (filterbycmp && !filterbycmp.data) {
        filterbycmp.data = {
            "defaultNodes": ["Document Category", "Document Type", "Country"],
            "defaultFilter": "",
            "baseApiUrl": "https://portal-test.who.int/ems-core-api/api/",
				"msalConfig": {
                    "scopes": "api://75deca06-ae07-4765-85c0-23e719062833/access_as_user",
                    "username": "panganibanr@who.int"
				}
        }
    }
}

function setdocumentuploadConfiguration(){
    // document-upload component arguments 
    var documentuploadcmp = document.querySelector('document-upload');
    if (documentuploadcmp && !documentuploadcmp.data) {
        documentuploadcmp.data = {
            "mode": "new", "maxUploadSize": "5242880",
            "allowedFileTypes": "PDF, XLS, TXT, DOC, DOCX, XLSX, JPEG, PNG",
            "baseApiUrl": "https://portal-test.who.int/ems-core-api/api/",
			"msalConfig": {
                "scopes": "api://75deca06-ae07-4765-85c0-23e719062833/access_as_user",
                "username" : "panganibanr@who.int"
			}
		}
	}
}