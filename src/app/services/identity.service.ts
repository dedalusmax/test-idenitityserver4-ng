import { Injectable } from '@angular/core';
import { AuthWellKnownEndpoints, OpenIDImplicitFlowConfiguration, OidcSecurityService } from 'angular-auth-oidc-client';
import { AppSettings } from '../config/app-settings';

@Injectable()
export class IdentityService {

    constructor(
        private appSetting: AppSettings,
        private oidcSecurityService: OidcSecurityService
    ) {
    }

    load() {

        const config = new OpenIDImplicitFlowConfiguration();
        const endpoints = new AuthWellKnownEndpoints();

        config.stsServer = this.appSetting.identityServerUrl;
        // This is the redirect_url which was configured on the security token service (STS) server
        config.redirect_url = window.location.protocol + '//' + window.location.host + '/login';
        config.client_id = 'js_angular_admin';
        config.response_type = 'id_token token';
        // This must match the STS server configuration
        config.scope = 'openid profile email api:system';
        // Url after a server logout if using the end session API
        config.post_logout_redirect_uri = window.location.protocol + '//' + window.location.host;
        // Starts the OpenID session management for this client.
        config.start_checksession = false;
        // Renews the client tokens, once the token_id expires
        config.silent_renew = true;
        // URL which can be used for a lightweight renew callback
        config.silent_renew_url = this.appSetting.identityServerUrl + '/silent-renew.html';
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

        endpoints.issuer = this.appSetting.identityServerUrl;
        endpoints.jwks_uri = this.appSetting.identityServerUrl + '/.well-known/openid-configuration/jwks';
        endpoints.authorization_endpoint = this.appSetting.identityServerUrl + '/connect/authorize';
        endpoints.token_endpoint = this.appSetting.identityServerUrl + '/connect/token';
        endpoints.userinfo_endpoint = this.appSetting.identityServerUrl + '/connect/userinfo';
        endpoints.end_session_endpoint = this.appSetting.identityServerUrl + '/connect/endsession';
        endpoints.check_session_iframe = this.appSetting.identityServerUrl + '/connect/checksession';
        endpoints.revocation_endpoint = this.appSetting.identityServerUrl + '/connect/revocation';
        endpoints.introspection_endpoint = this.appSetting.identityServerUrl + '/connect/introspect';

        return this.oidcSecurityService.setupModule(config, endpoints);
    }
}
