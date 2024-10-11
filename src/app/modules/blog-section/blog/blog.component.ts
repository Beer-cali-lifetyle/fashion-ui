import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from '../../script-load/script-load.component';
import { AppBase } from '../../../../app-base.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  standalone: true,
  imports: [
    CommonModule, ScriptLoadComponent
  ]
})
export class BlogComponent extends AppBase implements OnInit {
  blog: any;
  imgBaseUrl: string = environment.api.base_url;
  constructor(private activatedRoute: ActivatedRoute,
    private ApiService: ApiService
  ) {
    super();
    this.checkMode(this.activatedRoute.snapshot.params);
  }

  async ngOnInit() {
    await this.fetchBlog();
  }

  async fetchBlog() {
    await this.ApiService.fetchBlog(this.id).then((res) => {
      this.blog = res
    })
  }

}
