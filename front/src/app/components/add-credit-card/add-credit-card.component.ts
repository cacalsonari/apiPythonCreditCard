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

    this.creditCardService.addCC(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.newCC();
        },
        error => {
          console.log(error);
        });
  }

  newCC(): void {
    this.submitted = false;
    this.creditcard = {
      holder: '',
      number: '',
      exp_date: '',
      cvv: ''
    };
  }

}
