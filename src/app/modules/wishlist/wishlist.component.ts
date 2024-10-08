import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from "../script-load/script-load.component";
import { ApiService } from '../../shared/services/api.service';
import { Console } from 'console';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  standalone: true,
  imports: [ScriptLoadComponent]
})
export class WishlistComponent implements OnInit {
  wishLstItems: any;
  constructor(
    private ApiService: ApiService
  ) { }

  async ngOnInit() {
    await this.ApiService.fetchWishList().then((res) => {
      this.wishLstItems = res
      console.log(this.wishLstItems)
    })
  }

}
