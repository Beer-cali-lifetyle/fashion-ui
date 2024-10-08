import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from "../script-load/script-load.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { CommonModule } from '@angular/common';
import { UiToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  standalone: true,
  imports: [ScriptLoadComponent, RouterModule, CommonModule]
})
export class ShopListComponent implements OnInit {
  products: any = [];
  categoryId: string | null = null;
  subcategoryId: string | null = null;
  constructor(
    private ApiService: ApiService,
    private toaster: UiToasterService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.categoryId = params['categoryId'] || null;
      this.subcategoryId = params['subcategoryId'] || null;

      if (this.categoryId) {
        console.log('Category ID:', this.categoryId);
       await this.fetchproductsWithFilter({categoryId: this.categoryId})
      }

      if (this.subcategoryId) {
        console.log('Subcategory ID:', this.subcategoryId);
        await this.fetchproductsWithFilter({subcategoryId: this.subcategoryId})
      }
    });
    if(!(this.categoryId || this.subcategoryId)) {
    await this.ApiService.fetcHlatestProducts().then((res) => {
      this.products = res?.data
    })}
  }

  async addToCart(id: any) {
    const payload = {
      productId: id,
      quantity: 1
    }
    await this.ApiService.addToCart(payload).then(async res => {
      await this.toaster.Success('Added to cart successfully')
    })
  }

  async addToWishlist(id: any, i: any) {
    await this.ApiService.addToWishlist({ productId: id }).then(async (res) => {
      this.products[i]['is_whishlisted'] = true
    })
  }

  // async removeFromWishlist() {
  //   await this.ApiService.removeFromWishlist(

  //   ).then(async res => {
  //     await this.fetchWishlist();
  //   })
  // }

async fetchproductsWithFilter(data: any) {
  this.products = [];
  await this.ApiService.fetchFilteredProduct(data).then((res)=> {
    this.products = res;
  })
}

}
