//----------------------------------------------------------------------------------------------
//    Copyright 2014 Microsoft Corporation
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
//----------------------------------------------------------------------------------------------

using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Builder;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Owin;
using WebApp.Utils;

[assembly: OwinStartup(typeof(WebApp.Startup))]

namespace WebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //app.UseKentorOwinCookieSaver();

            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            app.UseCookieAuthentication(new CookieAuthenticationOptions());

            app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
            {
                Authority = AuthenticationConfig.Authority,
                ClientId = AuthenticationConfig.ClientId,
                ClientSecret = AuthenticationConfig.ClientSecret,
                RedirectUri = AuthenticationConfig.RedirectUri,
                Notifications = new OpenIdConnectAuthenticationNotifications
                {
                    AuthorizationCodeReceived = OnAuthorizationCodeReceived
                },
                SaveTokens = true,
                UseTokenLifetime = true
            });

            app.Build();
        }
    }
}
