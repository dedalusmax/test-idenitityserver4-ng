import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {

    // This is the URL where the security token service (STS) server is located
    identityServerUrl = 'http://localhost:5000';
}
