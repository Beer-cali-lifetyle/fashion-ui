import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SharedModule } from '../../../shared/shared/shared.module';
import { ApiService } from '../../../shared/services/api.service';
import { CommonService } from '../../../shared/services/common.service';
import { Router } from '@angular/router';

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
    private ApiService: ApiService,
    public router: Router
  ) { }

  async ngOnInit() {
    await this.fetchCategories()
  }

  async fetchCategories() {
    await this.ApiService.getCategories().then((res) => {
      this.categories = res;
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/sign-in']);
  }

}
