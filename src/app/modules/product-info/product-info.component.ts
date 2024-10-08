import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from "../script-load/script-load.component";
import { ApiService } from '../../shared/services/api.service';
import { AppBase } from '../../../app-base.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UiToasterService } from '../../core/services/toaster.service';
import { ContextService } from '../../core/services/context.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
  standalone: true,
  imports: [ScriptLoadComponent, CommonModule, FormsModule, RouterModule]
})
export class ProductInfoComponent extends AppBase implements OnInit {
  productInfo: any;
  cartInfo: any;
  quantity: number = 1;
  wishlist: any;
  constructor(private ApiServie: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toaster: UiToasterService,
    public contextService: ContextService
  ) {
    super();
    this.checkMode(this.activatedRoute.snapshot.params);
  }

  async ngOnInit() {
    await this.ApiServie.fetchProduct(this.id).then(async (res) => {
      this.productInfo = res?.product
      await this.getCart();
      await this.fetchWishlist();
    })
  }

  increment() {
    this.quantity++;
    if (this.cartInfo?.id) {
      this.updateQuantity();
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      if (this.cartInfo?.id) {
        this.updateQuantity();
      }
    }
  }

  async addToCart() {
    if (this.contextService.user()) {
    if (this.productInfo?.id && this.quantity > 0) {
      const payload = {
        productId: this.productInfo?.id,
        quantity: this.quantity
      }
      await this.ApiServie.addToCart(payload).then(async res => {
        await this.getCart();
        await this.toaster.Success('Added to cart successfully')
      })
    }
  } else {
      this.router.navigate(['/auth/sign-in'])
    }
  }


  async getCart() {
    if (this.contextService.user()) {
    await this.ApiServie.getCartProducts().then((res) => {
      this.contextService.cart.set(res)
      res?.data?.map((item: any) => {
        if (item?.product?.id === this.productInfo?.id) {
          this.cartInfo = item
          this.quantity = item?.quantity;
        }
      })
    })
  }
  }

  async updateQuantity() {
    const payload = {
      quantity: this.quantity
    }
    await this.ApiServie.updateQuantity(payload, this.cartInfo?.id).then(async res => {
     await this.getCart()
    })
  }

  async addToWishlist() {
    if (this.contextService.user()) {
    const payload = {
      productId: this.productInfo?.id
    }
    await this.ApiServie.addToWishlist(payload).then(async (res) => {
      await this.fetchWishlist();
    }) } else {
      this.router.navigate(['/auth/sign-in'])
    } 
  }

  async fetchWishlist() {
    if (this.contextService.user()) {
    this.wishlist = null;
    await this.ApiServie.fetchWishlist().then(res => {
      res?.data?.map((item: any) => {
        if (item?.product?.id === this.productInfo?.id) {
          this.wishlist = item;
        }
      })
    })}
  }

  async removeFromWishlist() {
    await this.ApiServie.removeFromWishlist(this.wishlist?.id).then(async res => {
      await this.fetchWishlist();
    })
  }

}
