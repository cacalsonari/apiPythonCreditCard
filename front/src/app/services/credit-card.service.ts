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

  ngOnInit(): void {
    this.token = 'd3a33e50b046e9278591c3a3536b0c20b3908c64'//localStorage.getItem('token') || null;
    if(this.token !== null){
      this.header = {
        headers: {'Authorization': 'Token d3a33e50b046e9278591c3a3536b0c20b3908c64'}
      }
    } 
    
  }

  getAllCC(): Observable<any> {
    return this.http.get(`${baseUrl}/credit-card`, {
      headers: {'Authorization': 'Token d3a33e50b046e9278591c3a3536b0c20b3908c64'}
    });
  }

  get(id: any): Observable<any> {  
    return this.http.get(`${baseUrl}/credit-card?id=${id}`, {
      headers: {'Authorization': 'Token d3a33e50b046e9278591c3a3536b0c20b3908c64'}
    });  
  }

  addCC(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/credit-card`, data, {
      headers: {'Authorization': 'Token d3a33e50b046e9278591c3a3536b0c20b3908c64'}
    });
  }
}
