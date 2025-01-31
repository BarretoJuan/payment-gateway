import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

type PaymentDetails = {
  user_id: string;
  course_id: string;
  course_name: string;
  amount: number;
  payment_date: string;
}
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API_URL = 'http://localhost:3000/api/payment/details';
  constructor(private http: HttpClient) { }

  getPaymentDetails(token: string): Observable<PaymentDetails> {
    // return this.http.get<PaymentDetails>(`${this.API_URL}?token=${token}`);
    const mockData: PaymentDetails = {
      user_id: '12345',
      course_id: '6789',
      course_name: 'CCNA Networking',
      amount: 49.99,
      payment_date: new Date().toISOString()
    };

    // Retornar un Observable que emite los datos después de 2 segundos
    return of(mockData).pipe(delay(2000));
  
  }

  
}
