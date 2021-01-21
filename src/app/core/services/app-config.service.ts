import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AppConfigInterface} from '../interfaces';

@Injectable()
export class AppConfigService {
  static settings: AppConfigInterface;

  constructor(private _http: HttpClient) {
  }

  load(): Promise<AppConfigInterface> {
    const jsonFile = `assets/config/setting/config.${environment.production ? 'prod' : 'dev'}.json`;
    return new Promise<AppConfigInterface>((resolve, reject) => {
      this._http.get(jsonFile).toPromise().then((response: AppConfigInterface) => {
        AppConfigService.settings = (response as AppConfigInterface);
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
