import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private http: HttpClient) { }
  token = localStorage.getItem('token');
  header: any;

  getAllCC(): Observable<any> {
    return this.http.get(`${baseUrl}/credit-card`, {
      headers: {Authorization: 'Token ' + this.token}
    });
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/credit-card?id=${id}`, {
      headers: {Authorization: 'Token ' + this.token}
    });
  }

  addCC(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/credit-card`, data, {
      headers: {Authorization: 'Token ' + this.token}
    });
  }
}
