import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AuthModule } from 'angular-auth-oidc-client';

import { AuthInterceptor } from './auth.interceptor';
import { AdminGuard } from './admin.guard';
import { AppSettings } from './config/app-settings';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';

// services
import { ConfigService } from './services/config.service';
import { IdentityService } from './services/identity.service';

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
    {
      provide: ConfigService,
      useClass: ConfigService,
      deps: [HttpClient]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService<AppSettings>) => () => config.load(),
      deps: [ConfigService, HttpClient],
      multi: true
    },
    {
      provide: AppSettings,
      useFactory: (configService: ConfigService<AppSettings>) => {
        return configService.config;
      },
      deps: [ConfigService, HttpClient]
    },
    IdentityService,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
