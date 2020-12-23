import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private http: HttpClient) { }
  token: string
  header: any

  ngOnInit(): void {}

  getAllCC(): Observable<any> {
    return this.http.get(`${baseUrl}/credit-card`, {
      headers: {'Authorization': 'Token f1abc72c59dc232f61057ce68f37d2093c7ab171'}
    });
  }

  get(id: any): Observable<any> {  
    return this.http.get(`${baseUrl}/credit-card?id=${id}`, {
      headers: {'Authorization': 'Token f1abc72c59dc232f61057ce68f37d2093c7ab171'}
    });  
  }

  addCC(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/credit-card`, data, {
      headers: {'Authorization': 'Token f1abc72c59dc232f61057ce68f37d2093c7ab171'}
    });
  }
}
