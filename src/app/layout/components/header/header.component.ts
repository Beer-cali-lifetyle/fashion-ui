import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SharedModule } from '../../../shared/shared/shared.module';
import { ApiService } from '../../../shared/services/api.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ContextService } from '../../../core/services/context.service';

@Component({
  imports: [
    SharedModule
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true
})
export class HeaderComponent implements OnInit {
  imgBaseUrl: string = environment.api.base_url;
  categories: any = [];
  cart: any;
  constructor(
    private ApiService: ApiService,
    public router: Router,
    public contextService: ContextService
  ) { }

  async ngOnInit() {
    await this.fetchCategories()
    await this.fetchCart();
    this.contextService.cart().subscribe((cartData: any) => {
      if (cartData && cartData.data) {
        this.calculateSubTotal(cartData.data);
      }
    });
  }

  async fetchCategories() {
    await this.ApiService.getCategories().then((res) => {
      this.categories = res;
    })
  }

  async fetchCart() {
    if (this.contextService.user()) {
    await this.ApiService.getCartProducts().then(async res => {
      this.contextService.cart.set(res)
      this.cart = res
    })}
  }

  async removeItemFromCart(id: any) {
    await this.ApiService.removeItemCart(id).then(async res => {
      await this.fetchCart();
    })
  }

  calculateSubTotal(cart: any) {
    let itemsTotal = 0;
    cart?.data?.map((item: any) => {
      itemsTotal += item?.quantity * item?.product?.price
    })
    return itemsTotal
  }

  redirectToShopList(type: string, id: number) {
    if (type === 'category') {
      this.router.navigate(['/shop'], { queryParams: { categoryId: id } });
    } else if (type === 'subcategory') {
      this.router.navigate(['/shop'], { queryParams: { subcategoryId: id } });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/sign-in']);
  }

}
