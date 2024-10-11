import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from '../../script-load/script-load.component';
import { ApiService } from '../../../shared/services/api.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { AppBase } from '../../../../app-base.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  standalone: true,
  imports: [
    ScriptLoadComponent, CommonModule, NgbPaginationModule, RouterModule
  ]
})
export class BlogListComponent extends AppBase implements OnInit {
  blogs: any = [];
  imgBaseUrl: string = environment.api.base_url;
  constructor(private ApiService: ApiService) { super() }

  async ngOnInit() {
    await this.fetchBlogs();
  }

  async fetchBlogs() {
    await this.ApiService.fetchBlogs({ perPage: this.pageSize, page: this.currentPage }).then(async (res) => {
      this.blogs = res;
    })
  }

  async onPageChange(pagenumber: any) {
    this.currentPage = pagenumber;
    await this.fetchBlogs();
  }

}
