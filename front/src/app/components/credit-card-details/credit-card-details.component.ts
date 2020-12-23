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

  loadInfo(id:any): void{
    this.creditCardService.get(id)
      .subscribe(
        data => {
          this.creditCardInfo = data[0];
        },
        error => { }
      ); 
  }

}
