import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SharedModule } from '../../../shared/shared/shared.module';
import { ApiService } from '../../../shared/services/api.service';

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
  categories: any = [];
  constructor(
    private ApiService: ApiService
  ) { }

  async ngOnInit() {
      await this.fetchCategories()
  }

  async fetchCategories() {
    debugger;
    await this.ApiService.getCategories().then((res) => {
      this.categories = res;
      console.log(this.categories)
    })
  }

}
