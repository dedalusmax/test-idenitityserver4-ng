import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'

})
export class AppComponent {
  title = 'test-identityserver4';

  constructor(
    translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
