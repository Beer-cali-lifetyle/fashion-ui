import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import Swiper from 'swiper';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import anime from 'animejs/lib/anime.es.js';
import { SharedModule } from '../../shared/shared/shared.module';
import { ScriptLoadComponent } from '../script-load/script-load.component';

@Component({
  imports: [
    CommonModule,
    SharedModule,
    ScriptLoadComponent
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements AfterViewInit {
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
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        const swiper = new Swiper('.swiper', {
          slidesPerView: 1,
          direction: 'horizontal',
          loop: true,
          parallax: true,
          speed: 1000,
          pagination: {
            el: '.swiper-number',
            clickable: true
          },
          autoplay: {
            delay: 4000,
            disableOnInteraction: false
          },
          keyboard: {
            enabled: true,
            onlyInViewport: true
          },
          effect: 'slide'
        });
      }, 0);
      // anime({
      //   targets: '.row .col',
      //   translateX: [30, 0],
      //   opacity: [0, 1],
      //   duration: 100,
      //   delay: anime.stagger(100),
      //   easing: 'easeOutQuad'
      // });
      // anime({
      //   targets: '.childs',
      //   translateY: [-15, 0],
      //   perspective: [1200, 1200],
      //   scale: [1.1, 1],
      //   rotateX: [50, 0],
      //   opacity: [0, 1],
      //   duration: 400,
      //   delay: 100,
      //   easing: 'easeOutQuad'
      // });
      // anime({
      //   targets: '.childs', 
      //   translateY: [-15, 0],
      //   opacity: [0, 1],
      //   duration: 300,
      //   delay: 0,
      //   easing: 'easeOutQuad',
      // });
    }
  }
}
