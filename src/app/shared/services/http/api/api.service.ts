import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(routeAPI: string): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    return this.http.get(environment.apiURL + routeAPI, { headers });
  }

  post(routeAPI: string, body: any): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    return this.http.post(environment.apiURL + routeAPI, body, { headers });
  }
}
