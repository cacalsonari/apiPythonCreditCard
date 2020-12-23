import { Component, OnInit } from '@angular/core';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.sass']
})
export class AddCreditCardComponent implements OnInit {

  creditcard = {
    holder: '',
    number: '',
    exp_date: '',
    cvv: ''
  };
  submitted = false;
  error = false;
  loading = false;

  constructor(private creditCardService: CreditCardService) { }

  ngOnInit(): void {
  }

  submit(): void {
    const data = {
      holder: this.creditcard.holder,
      number: this.creditcard.number,
      exp_date: this.creditcard.exp_date,
      cvv: this.creditcard.cvv
    };
    this.loading = true;
    this.creditCardService.addCC(data)
      .subscribe(
        response => {
          this.loading = false;
          this.submitted = true;
          this.error = false;
          this.newCC();
        },
        error => {
          this.loading = false;
          this.error = error["error"];
          this.submitted = false;
        });
  }

  newCC(): void {
    this.creditcard = {
      holder: '',
      number: '',
      exp_date: '',
      cvv: ''
    };
  }

}
