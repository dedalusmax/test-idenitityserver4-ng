import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settings } from '../config/settings';

@Injectable()
export class ConfigService<T extends Settings> {
    public config: T;

    constructor(private http: HttpClient) {
    }

    load() {
        return this.http.get('test.config.json')
        .toPromise()
        .then((data: any) => {
            this.config = data;
        });
    }
}

