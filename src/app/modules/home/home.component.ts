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
  categories: any[] = [];
  products: any = [];
  blogs: any = [];
  imgBaseUrl: string = environment.api.base_url;
  lookbookData = {
    year: 'Lookbook 2023',
    heading: 'New arrival',
    subheading: 'collection',
    description: 'Flash summer sale 70% off on selected collection for him.',
    button: {
      text: 'View collection',
      link: '/demo-fashion-store-shop.html',
    },
    slides: [
      {
        title: 'Ethnic wear',
        subtitle: 'Outfits matching',
        image: 'https://craftohtml.themezaa.com/images/demo-fashion-store-collection-slider-01.jpg',
        alt: 'Ethnic wear collection',
        link: '/demo-fashion-store-shop.html',
        linkText: 'Explore collection',
      },
      {
        title: 'Dress materials',
        subtitle: 'Explore a variety',
        image: 'https://craftohtml.themezaa.com/images/demo-fashion-store-collection-slider-02.jpg',
        alt: 'Dress materials collection',
        link: '/demo-fashion-store-shop.html',
        linkText: 'Explore collection',
      },
      {
        title: 'Western wear',
        subtitle: 'Traditional attires',
        image: 'https://craftohtml.themezaa.com/images/demo-fashion-store-collection-slider-03.jpg',
        alt: 'Western wear collection',
        link: '/demo-fashion-store-shop.html',
        linkText: 'Explore collection',
      },
      // Add more slides here
    ],
  };
  sliderOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.slider-four-slide-pagination-1',
      clickable: true,
      dynamicBullets: false,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      1400: { slidesPerView: 4 },
      1024: { slidesPerView: 3 },
      768: { slidesPerView: 3 },
      576: { slidesPerView: 2 },
      320: { slidesPerView: 1 },
    },
    effect: 'slide',
  };
  isBrowser: boolean;
  slides = [
    {
      image: 'https://craftohtml.themezaa.com/images/demo-fashion-store-slider-01.jpg',
      title: "Women's collection",
      subtitle: "Discount on selected collection!",
      link: 'demo-fashion-store-shop.html',
    },
    {
      image: 'https://craftohtml.themezaa.com/images/demo-fashion-store-slider-02.jpg',
      title: "Men's collection",
      subtitle: "Discount on selected collection!",
      link: 'demo-fashion-store-shop.html',
    },
    {
      image: 'https://craftohtml.themezaa.com/images/demo-fashion-store-slider-03.jpg',
      title: "Children's collection",
      subtitle: "Discount on selected collection!",
      link: 'demo-fashion-store-shop.html',
    }
  ];
  features = [
    {
      icon: 'package',
      title: 'Free shipping',
      description: 'Free shipping on first order'
    },
    {
      icon: 'refresh-cw',
      title: '15 days returns',
      description: 'Moneyback guarantee'
    },
    {
      icon: 'credit-card',
      title: 'Secure payment',
      description: '100% protected payment'
    },
    {
      icon: 'phone-call',
      title: 'Online support',
      description: '24/7 days a week support'
    }
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private ApiService: ApiService,
    private router: Router,
    private contextService: ContextService,
    private cdr: ChangeDetectorRef,
    private scriptService: ScriptLoaderService) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit() {
    await this.fetchCategories();
    await this.fetchProducts();
    await this.fetchBlogs()
  }

  async ngAfterViewInit() {
    await this.scriptService.loadScripts();
    await this.cdr.detectChanges();
    if (this.isBrowser) {
      this.initializeSwiper();
    }
  }


  initializeSwiper() {
    setTimeout(async () => {
      await this.initializeGrid();
      new Swiper('.product-slider', {
        slidesPerView: 4,  // 4 cards per slide
        spaceBetween: 30,  // Adjust the space between cards (optional)
        loop: true,        // Infinite loop
        autoplay: {
          delay: 3000,     // Auto-slide every 3 seconds (can adjust)
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,  // Desktop large screens
            spaceBetween: 30
          },
          768: {
            slidesPerView: 3,  // Tablet screens
            spaceBetween: 20
          },
          640: {
            slidesPerView: 2,  // Mobile screens
            spaceBetween: 10
          },
          320: {
            slidesPerView: 1,  // Small mobile screens
            spaceBetween: 10
          }
        }
      });
    }, 500);
  }

  initializeGrid() {
    const elem = document.querySelector('.shop-wrapper');
    const iso = new Isotope(elem, {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows' // or your preferred layout mode
    });
  }

  async fetchBlogs() {
    await this.ApiService.fetchBlogs().then((res) => {
      this.blogs = res
    })
  }

  redirectToShopList(type: string, id: number) {
    if (type === 'category') {
      this.router.navigate(['/shop'], { queryParams: { categoryId: id } });
    } else if (type === 'subcategory') {
      this.router.navigate(['/shop'], { queryParams: { subcategoryId: id } });
    }
  }

  async fetchCategories() {
    await this.ApiService.getCategories().then((res) => {
      this.categories = res;
    })
  }

  async fetchProducts() {
    await this.ApiService.fetcHlatestProducts({ perPage: this.pageSize, page: this.currentPage }).then(res => {
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
        // await this.getCart();
        // await this.toaster.Success('Added to cart successfully')
      })
    }
    else {
      this.router.navigate(['/auth/sign-in'])
    }
  }

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
