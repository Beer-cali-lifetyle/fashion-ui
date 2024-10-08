import { Component, OnInit, Pipe, PipeTransform, ViewChild, TemplateRef } from '@angular/core';
import { AppBase } from '../../../../app-base.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared/shared.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../shared/services/api.service';
import Swal from 'sweetalert2';
import { UiToasterService } from '../../../core/services/toaster.service';
import { ContextService } from '../../../core/services/context.service';

@Pipe({
  name: 'cardNumber',
  standalone: true
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string): string {
    // Remove any non-digit characters from the input value
    const digitsOnly = value.replace(/\D/g, '');

    // Split the digits into groups of 4
    const groups = digitsOnly.match(/.{1,4}/g);

    // Join the groups with dashes
    const formattedValue = groups ? groups.join(' ') : '';

    return formattedValue;
  }
}

@Component({
  selector: 'app-paymentDetails',
  templateUrl: './paymentDetails.component.html',
  styleUrls: ['./paymentDetails.component.css'],
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule, CardNumberPipe]
})
export class PaymentDetailsComponent extends AppBase implements OnInit {
  @ViewChild('modalContentPayment') modalContentPayment: TemplateRef<any> | undefined;
  cardLogoImg: any;
  paymentCards: any;
  public editId: any = null;
  month: Array<{ key: string, value: string }> = [];
  years: Array<any> = []
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService,
    private toaster: UiToasterService,
    private modalService: NgbModal,
    private contextService: ContextService
  ) { super() }

  async ngOnInit() {
    this.month = [];
    this.months.forEach((key, index) => {
      this.month.push({ key: `${index + 1}`, value: key })
    });

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i <= currentYear + 20; i++) {
      this.years.push(i);
    }
    this.form = this.fb.group({
      holder_name: ['', [Validators.required]],
      card_number: ['', [Validators.required, Validators.pattern(/^(4|5)\d+/), Validators.maxLength(19), Validators.minLength(16)]],
      exp_month: ['', [Validators.required]],
      exp_year: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    });
    await this.fetchPaymentCards();
  }


  handleKeyPressName(e: any) {
    var x = e.which || e.keyCode;
    if ((x >= 65 && x <= 90) || (x >= 97 && x <= 122) || x === 32) {
      return true;
    }
    return false;
  }

  disablePaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  handleKeyPress(e: any) {
    var x = e.which || e.keyCode;
    if (x > 64 && x < 91 || x > 96 && x < 123 || (x >= 33 && x <= 47) || (x >= 58 && x <= 64) || (x >= 91 && x <= 96) || (x >= 123 && x <= 126)) {
      return false;
    }

    this.cardNumberInput();
    return true;
  }

  cardNumberInput() {
    this.form.get('card_number')?.valueChanges.subscribe(value => {
      if (value.length > 19) {
        value = value.slice(0, 19);
        this.form.get('card_number')?.setValue(value);
      }
    });
  }

  cardLogo(e: any) {
    let firstLetter = this.form.value.card_number.slice(0, 2);
    switch (firstLetter) {
      case "34":
      case "37":
        this.cardLogoImg = 'images/credit_card/amex.svg';
        break;
      case "40":
      case "41":
      case "42":
      case "43":
      case "44":
      case "45":
      case "46":
      case "47":
      case "48":
      case "49":
        this.cardLogoImg = 'images/credit_card/visa.svg';
        break;
      case "51":
      case "52":
      case "53":
      case "54":
      case "55":
        this.cardLogoImg = 'images/credit_card/mastercard.svg';
        break;
      case "36":
      case "38":
      case "30":
        this.cardLogoImg = 'images/credit_card/diners.svg';
        break;
      case "60":
        this.cardLogoImg = 'images/credit_card/discover.svg';
        break;
      case "18":
      case "21":
      case "32":
      case "33":
      case "35":
        this.cardLogoImg = 'images/credit_card/jcb.svg';
        break;
      default:
        this.cardLogoImg = null;
        break;
    }
  }

  cvvInput(e: any) {
    var x = e.which || e.keyCode;
    if (x > 64 && x < 91 || x > 96 && x < 123 || (x >= 33 && x <= 47) || (x >= 58 && x <= 64) || (x >= 91 && x <= 96) || (x >= 123 && x <= 126)) {
      return false;
    }

    this.form.get('cvv')?.valueChanges.subscribe(value => {
      if (value.length > 3) {
        value = value.slice(0, 3);
        this.form.get('cvv')?.setValue(value);
      }
    });
    return true;
  }




  async fetchPaymentCards() {
    await this.ApiService.fetchPaymentCards(this.contextService.user()?.id).then((res) => {
      this.paymentCards = res
    })
  }

  openModalToAdd() {
    this.modalService.open(this.modalContentPayment, { centered: true, backdrop: 'static', keyboard: false, size: 'lg' });
  }

  async onSubmit() {
    if (this.form.valid) {
      debugger;
      const value = {
        card_number: this.form.value.card_number,
        name_on_card: this.form.value.holder_name,
        expiry_month: this.form.value.exp_month,
        expiry_year: this.form.value.exp_year,
        cvv: this.form.value.cvv
      }
      await this.ApiService.savePaymentCards(value).then(async (res) => {
        this.toaster.Success('Address Added Successfully');
      })
      await this.fetchPaymentCards()
      this.closeModal();
    } else { this.validateForm(); }

  }

  async editMode(item: any) {
    this.editId = item?.id;
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
    this.openModalToAdd();
  }

  async deleteAddress(id: any) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure you want to delete this address?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-yellow',
        cancelButton: 'btn btn-secondary'
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.ApiService.deletAddress(id).then(async (res) => {
          this.toaster.Remove('Deleted SUccessfully');
          await this.fetchPaymentCards();
        })
      }
    });

  }

  closeModal() {
    this.editId = null;
    this.form.reset();
    this.modalService.dismissAll()
  }



}


