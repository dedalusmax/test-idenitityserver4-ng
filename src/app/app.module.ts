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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    public oidcSecurityService: OidcSecurityService
  ) {
    const config = new OpenIDImplicitFlowConfiguration();
    const endpoints = new AuthWellKnownEndpoints();

    config.stsServer = 'http://localhost:5000';
    config.redirect_url = 'http://localhost:4203/login';
    config.client_id = 'js_angular_admin';
    config.response_type = 'id_token token';
    config.scope = 'openid profile email api1';
    config.post_logout_redirect_uri = 'http://localhost:4203';
    config.start_checksession = false;
    config.silent_renew = true;
    config.silent_renew_url = 'http://localhost:5000/silent-renew.html';
    config.post_login_route = '/home';
    config.forbidden_route = '/logout';
    config.unauthorized_route = '/logout';
    config.log_console_warning_active = true;
    config.log_console_debug_active = true;
    // tslint:disable-next-line:no-magic-numbers
    config.max_id_token_iat_offset_allowed_in_seconds = 10;

    endpoints.issuer = 'http://localhost:5000';
    endpoints.jwks_uri = 'http://localhost:5000/.well-known/openid-configuration/jwks';
    endpoints.authorization_endpoint = 'http://localhost:5000/connect/authorize';
    endpoints.token_endpoint = 'http://localhost:5000/connect/token';
    endpoints.userinfo_endpoint = 'http://localhost:5000/connect/userinfo';
    endpoints.end_session_endpoint = 'http://localhost:5000/connect/endsession';
    endpoints.check_session_iframe = 'http://localhost:5000/connect/checksession';
    endpoints.revocation_endpoint = 'http://localhost:5000/connect/revocation';
    endpoints.introspection_endpoint = 'http://localhost:5000/connect/introspect';

    this.oidcSecurityService.setupModule(config, endpoints);

    console.log('APP STARTING');
  }
}
