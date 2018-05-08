import { Injectable } from '@angular/core';
import { Settings } from './settings';

@Injectable()
export class AppSettings implements Settings {

    // This is the URL where the security token service (STS) server is located
    identityServerUrl: string;
}
