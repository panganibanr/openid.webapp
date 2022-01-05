  var EMRSconfig = {
    clientId: "cf3b4ee1-333b-4327-b174-eb8c9c57b871",
    authority: "https://login.microsoftonline.com/171d96c1-7170-4561-a662-66c07e043e23",
    redirectUri: "https://www.emdemos.com/emrsdocui/msal1.html",
    scopes: ["api://7b78a6e1-50a5-475d-b109-d7c18b63f513/EMRS_API"]
  };
  var loginRequest = {
    scopes: EMRSconfig.scopes
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

  const myMSALObj = new Msal.UserAgentApplication(msalConfig);
  function authCallback(error, response) {
    debugger;
	setComponentUsername(response.account.userName);
  }
  myMSALObj.handleRedirectCallback(authCallback);
  document.addEventListener('DOMContentLoaded', (event) => {
	  myMSALObj.acquireTokenSilent(loginRequest).then(function(accessTokenResponse) {
		  setComponentUsername(accessTokenResponse.account.userName);

	}).catch(function (error) {
		console.log(error);
		myMSALObj.loginRedirect(loginRequest);
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
            "baseApiUrl": "https://emrsapidev.azurewebsites.net/api/",
            "msalConfig": {
                "scopes": "api://7b78a6e1-50a5-475d-b109-d7c18b63f513/EMRS_API",
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
            "baseApiUrl": "https://emrsapidev.azurewebsites.net/api/",
            "msalConfig": {
                "scopes": "api://7b78a6e1-50a5-475d-b109-d7c18b63f513/EMRS_API"
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
            "baseApiUrl": "https://emrsapidev.azurewebsites.net/api/",
            "msalConfig": {
                "scopes": "api://7b78a6e1-50a5-475d-b109-d7c18b63f513/EMRS_API"
            }
        }
    }
}