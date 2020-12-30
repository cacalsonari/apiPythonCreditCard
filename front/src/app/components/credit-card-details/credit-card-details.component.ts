import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.sass']
})
export class CreditCardDetailsComponent implements OnInit {

  id = this.route.snapshot.paramMap.get('id');
  creditCardInfo: any;

  constructor(private route: ActivatedRoute,
              private creditCardService: CreditCardService) { }

  ngOnInit(): void {
    if (this.id !== null){
      this.loadInfo(this.id);
    }
  }

  loadInfo(id: any): void{
    this.creditCardService.get(id)
      .subscribe(
        data => {          
          if(data[0] !== undefined){
            const newData = this.formatData(data[0]);
            this.creditCardInfo = newData;
          }else{
            this.creditCardInfo = data[0];
          }
          
        },
        error => { }
      );
  }

  formatData(data: any): any{
    const date = data.exp_date;
    const splitDate = date.split('-');

    data.exp_date = splitDate[1] + '/' + splitDate[0];
    return data;
  }

}
