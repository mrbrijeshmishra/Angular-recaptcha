import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiMethod } from 'src/app/constant/api-constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  response: any;

  constructor(private http: HttpClient) { }

    requestCall(
    api: any,
    method: ApiMethod,
    data?: any
  ): Observable<any> {

    switch (method) {
      case ApiMethod.GET:
        this.response = this.http
          .get(environment.BaseUrl + api + data)
          .pipe(catchError((error) => this.handleError(error)));
        break;
      case ApiMethod.POST:
        this.response = this.http
          .post(environment.BaseUrl + api, data)
          .pipe(catchError((error) => this.handleError(error)));
        break;
      default:
        break;
    }

    return this.response;

  }
  handleError(error: any): any {
    throw new Error('Method not implemented.');
  }

}
