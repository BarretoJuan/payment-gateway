import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './payment.service';
import { CommonModule } from '@angular/common';


type PaymentDetails = {
  user_id: string;
  course_id: string;
  course_name: string;
  amount: number;
  payment_date: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule], 
  providers: [PaymentService], 
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentService: PaymentService = inject(PaymentService);

  paymentToken: string | null = null;
  paymentDetails: PaymentDetails | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paymentToken = params['token'];

      if (this.paymentToken) {
        this.paymentService.getPaymentDetails(this.paymentToken).subscribe({
          next: (paymentDetails) => {
            this.paymentDetails = paymentDetails;
          },
          error: (error) => {
            this.errorMessage = error.message;
          }
        });
      }
    });
  }
}
