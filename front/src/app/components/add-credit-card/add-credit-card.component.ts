import { Component, OnInit } from '@angular/core';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.sass']
})
export class AddCreditCardComponent implements OnInit {

  ccForm: FormGroup;
  success = false;
  submitted = false;
  error = false;
  loading = false;

  constructor(private creditCardService: CreditCardService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ccForm = this.formBuilder.group({
      holder: ['', [Validators.required, Validators.minLength(2)]],
      number: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      exp_date: ['', [Validators.required, Validators.pattern(/^(1[0-2]|0?[1-9])[\/](?:[0-9]{2})?[0-9]{2}$/)]],
      cvv: ['',  [Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  get f(): any {
    return this.ccForm.controls;
  }

  submit(): void {
    const data = {
      holder: this.ccForm.value.holder,
      number: this.ccForm.value.number,
      exp_date: this.ccForm.value.exp_date,
      cvv: this.ccForm.value.cvv
    };
    this.submitted = true;

    if (!this.ccForm.invalid) {
      this.loading = true;
      this.creditCardService.addCC(data)
        .subscribe(
          response => {
            this.loading = false;
            this.success = true;
            this.error = false;
            this.newCC();
          },
          error => {
            this.loading = false;
            this.error = error.error;
            this.success = false;
          });
    }
  }

  newCC(): void {
    this.ccForm.reset();
    this.submitted = false;
  }

}
