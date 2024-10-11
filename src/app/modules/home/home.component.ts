import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import Swiper from 'swiper';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import anime from 'animejs/lib/anime.es.js';
import { SharedModule } from '../../shared/shared/shared.module';
import { ScriptLoadComponent } from '../script-load/script-load.component';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ContextService } from '../../core/services/context.service';
import { ScriptLoaderService } from '../../core/services/script-loader.service';
import { AppBase } from '../../../app-base.component';
declare var Isotope: any



@Component({
  imports: [
    CommonModule,
    SharedModule,
    ScriptLoadComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(30px)', opacity: 0 }),
        animate('800ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent extends AppBase implements AfterViewInit {
  categories: any[] = [{ catname: 'Men', image_file: 'men.jpg', id: 1 }, { catname: 'Women', image_file: 'women.jpg', id: 2 }, { catname: 'Women', image_file: 'women.jpg', id: 2 }, { catname: 'Women', image_file: 'women.jpg', id: 2 }, { catname: 'Women', image_file: 'women.jpg', id: 2 }, { catname: 'Women', image_file: 'women.jpg', id: 2 }];;
  products: any = [];
  blogs: any = [];
  currentYear: number = new Date().getFullYear();
  imgBaseUrl: string = environment.api.base_url;
  randomNumber: any = 0;
  randomNumber1: any = 0;
  productsCategoryWise: any = []
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private ApiService: ApiService,
    private router: Router,
    private contextService: ContextService,
    private cdr: ChangeDetectorRef,
    private scriptService: ScriptLoaderService) {
    super();
  }

  async ngOnInit() {
    await this.fetchCategories();
    await this.fetchProducts();
    await this.fetchBlogs()
    this.randomNumber = await this.getRandomNumber(this.categories?.length);
    this.randomNumber1 = await this.getRandomNumber(this.categories?.length);
    await this.fetchProductsCategoryWise();
  }

  async ngAfterViewInit() {
    // await this.scriptService.loadScripts();
    // await this.cdr.detectChanges();
  }

  initializeGrid() {
    const elem = document.querySelector('.shop-wrapper');
    const iso = new Isotope(elem, {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows' // or your preferred layout mode
    });
  }

  async fetchBlogs() {
    await this.ApiService.fetchBlogs({ perPage: 8, page: 1 }).then(async (res) => {
      this.blogs = res;
    })
  }

  async fetchProductsCategoryWise() {
    await this.ApiService.fetchFilteredProduct({ categoryId: this.randomNumber1, perPage: this.pageSize, page: this.currentPage }).then((res) => {
      this.productsCategoryWise = res?.data;
    })
  }

  redirectToShopList(type: string, id: number) {
    if (type === 'category') {
      this.router.navigate(['/shop'], { queryParams: { categoryId: id } });
    } else if (type === 'subcategory') {
      this.router.navigate(['/shop'], { queryParams: { subcategoryId: id } });
    }
  }

getRandomCategory() {
  if (this.categories && this.categories.length > 0) {
    const randomCategory = this.categories[this.getRandomNumber(this.categories.length)];
    return randomCategory;
} else {
    console.log('No categories available');
}
}

get hasCategories(): boolean {
  return this.categories?.length > 0;
}

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  async fetchCategories() {
    await this.ApiService.getCategories().then(async (res) => {
      this.categories = res?.categories;
    })
  }

  async fetchProducts() {
    await this.ApiService.fetcHlatestProducts({ perPage: 10, page: this.currentPage }).then(res => {
      this.products = res?.data;
    })
  }

  async addToCart(id: any) {
    if (this.contextService.user()) {
      const payload = {
        productId: id,
        quantity: 1
      }
      await this.ApiService.addToCart(payload).then(async res => {
        await this.getCart();
        // await this.toaster.Success('Added to cart successfully')
      })
    }
    else {
      this.router.navigate(['/auth/sign-in'])
    }
  }

  async getCart() {
    if (this.contextService.user()) {
    await this.ApiService.getCartProducts().then((res) => {
      this.contextService.cart.set(res)
    })
  }}

  async addToWishlist(id: any) {
    if (this.contextService.user()) {
      const payload = {
        productId: id
      }
      await this.ApiService.addToWishlist(payload).then(async (res) => {
        // await this.fetchWishlist();
      })
    } else {
      this.router.navigate(['/auth/sign-in'])
    }
  }

}
