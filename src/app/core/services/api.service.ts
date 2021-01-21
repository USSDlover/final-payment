import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AppConfigService} from './app-config.service';

@Injectable()
export class ApiService {
  protected apiServer = AppConfigService.settings.apiServer.base + AppConfigService.settings.apiServer.meta;

  constructor(private _http: HttpClient) {
  }

  private static _handleError(err): Observable<any> {
    console.log('Error occur while tried to make http request', err);
    return of({status: false, message: err.message});
  }

  makeGetApiCall<T>(endPoint: string, queryParams?: HttpParams): Observable<T> {
    return this._http
      .get<T>(`${this.apiServer}/${endPoint}`, {params: queryParams})
      .pipe(catchError((err => ApiService._handleError(err))));
  }

  makePostApiCall<T>(endPoint: string, body: any): Observable<T | boolean> {
    // TODO: Remove the next line
    return of(true);

    /*return this.http
      .post<T>(`${this.apiServer}/${endPoint}`, body)
      .pipe(catchError((err => this.handleError(err))));*/
  }
}
