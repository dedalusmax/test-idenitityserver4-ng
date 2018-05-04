import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import {
  AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';

import { AuthInterceptor } from './auth.interceptor';
import { AdminGuard } from './admin.guard';
import { AppSettings } from './config/app-settings';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    AuthModule.forRoot()
  ],
  providers: [
    AdminGuard,
    AppSettings,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    public oidcSecurityService: OidcSecurityService,
    appSetting: AppSettings
  ) {
    const config = new OpenIDImplicitFlowConfiguration();
    const endpoints = new AuthWellKnownEndpoints();

    // This is the URL where the security token service (STS) server is located
    config.stsServer = appSetting.identityServerUrl;
    // This is the redirect_url which was configured on the security token service (STS) server
    config.redirect_url = window.location.protocol + '//' + window.location.host + '/home';
    config.client_id = 'js_angular_admin';
    config.response_type = 'id_token token';
    // This must match the STS server configuration
    config.scope = 'openid profile email api:system';
    // Url after a server logout if using the end session API
    config.post_logout_redirect_uri =  window.location.protocol + '//' + window.location.host;
    // Starts the OpenID session management for this client.
    config.start_checksession = false;
    // Renews the client tokens, once the token_id expires
    config.silent_renew = true;
    // URL which can be used for a lightweight renew callback
    config.silent_renew_url = appSetting.identityServerUrl + '/silent-renew.html';
    // The default Angular route which is used after a successful login, if not using the trigger_authorization_result_event
    config.post_login_route = '/home';
    // Route, if the server returns a 403. This is an Angular route. HTTP 403
    config.forbidden_route = '/logout';
    // Route, if the server returns a 401. This is an Angular route. HTTP 401
    config.unauthorized_route = '/logout';
    // Automatically get user info after authentication.
    config.log_console_warning_active = true;
    // Logs all debug messages from the module to the console. This can be viewed using F12 in Chrome of Firefox
    config.log_console_debug_active = true;
    // tslint:disable-next-line:no-magic-numbers
    config.max_id_token_iat_offset_allowed_in_seconds = 10;

    endpoints.issuer = appSetting.identityServerUrl;
    endpoints.jwks_uri = appSetting.identityServerUrl + '/.well-known/openid-configuration/jwks';
    endpoints.authorization_endpoint = appSetting.identityServerUrl + '/connect/authorize';
    endpoints.token_endpoint = appSetting.identityServerUrl + '/connect/token';
    endpoints.userinfo_endpoint = appSetting.identityServerUrl + '/connect/userinfo';
    endpoints.end_session_endpoint = appSetting.identityServerUrl + '/connect/endsession';
    endpoints.check_session_iframe = appSetting.identityServerUrl + '/connect/checksession';
    endpoints.revocation_endpoint = appSetting.identityServerUrl + '/connect/revocation';
    endpoints.introspection_endpoint = appSetting.identityServerUrl + '/connect/introspect';

    this.oidcSecurityService.setupModule(config, endpoints);
  }

}
