import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from '../script-load/script-load.component';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [
    CommonModule, ScriptLoadComponent
  ]
})
export class CheckoutComponent implements OnInit {
  addresses: any = [];
  constructor(
    private ApiService: ApiService
  ) { }

  async ngOnInit() {
    await this.fetchAddres();
  }

  async fetchAddres() {
    await this.ApiService.fetchAddress().then((res) => {
      this.addresses = res
    })
  }

}
