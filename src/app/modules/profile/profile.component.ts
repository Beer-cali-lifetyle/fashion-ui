import { Component, OnInit } from '@angular/core';
import { AppBase } from '../../../app-base.component';
import { ScriptLoadComponent } from "../script-load/script-load.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentDetailsComponent } from './paymentDetails/paymentDetails.component';
import { AddressComponent } from './address/address.component';
import { ApiService } from '../../shared/services/api.service';
import { UiToasterService } from '../../core/services/toaster.service';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ScriptLoadComponent, ReactiveFormsModule, CommonModule, PaymentDetailsComponent, AddressComponent, OrdersComponent]
})
export class ProfileComponent extends AppBase implements OnInit {
  address: any;
  USStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
    "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];
  public editId: any = null;
  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService,
    private toaster: UiToasterService,
  ) { super() }

  async ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      pinCode: ['', Validators.required],
      address: ['', Validators.required],
      locality: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      landmark: [''],
      altPhoneNumber: ['', Validators.pattern(/^\+?[1-9]\d{1,14}$/)],
      defaultAddress: [false]
    });
    // await this.fetchAddres();
  }

  async receiveData(item: any) {
    this.address = item;
    this.form.patchValue({
      fullName: item?.full_name,
      mobileNumber: item?.mobile_number,
      pinCode: item?.pin_code,
      address: item?.address,
      locality: item?.locality,
      city: item?.city,
      state: item?.state,
      landmark: item?.landmark,
      altPhoneNumber: item?.alternate_phone_number,
      defaultAddress: item?.is_default == 1 ? true : false
    })
  }

  async fetchAddres() {
    await this.ApiService.fetchAddress().then((res) => {
      this.address = res
      res?.map((item: any) => {
        if (item?.is_default) {
          this.receiveData(item);
        }
      })
    })
  }

  async onSubmit() {
    if (this.form.valid) {
      const value = {
        full_name: this.form.value.fullName,
        mobile_number: this.form.value.mobileNumber,
        pin_code: this.form.value.pinCode,
        address: this.form.value.address,
        locality: this.form.value.locality,
        city: this.form.value.city,
        state: this.form.value.state,
        landmark: this.form.value.landmark,
        alternate_phone_number: this.form.value.altPhoneNumber,
        is_default: this.form.value.defaultAddress ? 1 : 0
      }
      await this.ApiService.editAddress(value, this.address?.id).then(async (res) => {
        this.toaster.Success('Address Added Successfully');
      })
      await this.fetchAddres()
    } else { this.validateForm(); }

  }
}
