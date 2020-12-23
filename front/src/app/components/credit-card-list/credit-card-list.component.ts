import { Component, OnInit } from '@angular/core';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.sass']
})
export class CreditCardListComponent implements OnInit {

  constructor(private creditCardService: CreditCardService) { }

  creditCardList:any

  ngOnInit(): void {
    this.creditCardList = []
    this.getAllCreditCard()
  }

  getAllCreditCard(): void {
    this.creditCardService.getAllCC()
      .subscribe(
        data => {
          this.creditCardList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );  
  }
}
