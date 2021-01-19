import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AppConfigService} from './app-config.service';

@Injectable()
export class ApiService {
  protected apiServer = AppConfigService.settings.apiServer.base + AppConfigService.settings.apiServer.meta;

  constructor(private http: HttpClient) {
  }

  makeGetApiCall<T>(endPoint: string, queryParams?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.apiServer}/${endPoint}`, {params: queryParams})
      .pipe(catchError((err => this.handleError(err))));
  }

  makePostApiCall<T>(endPoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.apiServer}/${endPoint}`, body)
      .pipe(catchError((err => this.handleError(err))));
  }

  private handleError(err): Observable<any> {
    console.log('Error occur while tried to make http request', err);
    return of({ status: false, message: err.message });
  }
}
