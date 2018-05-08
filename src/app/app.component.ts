import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IdentityService } from './services/identity.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'

})
export class AppComponent {

  constructor(
    translate: TranslateService,
    identityService: IdentityService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
    identityService.load();
  }
}
