import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpServie } from './http.service';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private isBrowser: boolean;

  constructor(
    private httpRequest: HttpServie,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID for SSR checks
  ) {
    this.isBrowser = isPlatformBrowser(platformId);  // Detect if it's a browser or server
  }

  async SignIn(data: any) {
    return await this.httpRequest.POST(`/login`, data);
  }

  async getUserDetails(id: string) {
    return await this.httpRequest.GET(`/user/${id}`);
  }

  async getCategories() {
    return await this.httpRequest.POST(`/categories`);
  }

  async getById(code: string) {
    return await this.httpRequest.GET(`/end-point/${code}`);
  }

  async getList() {
    return await this.httpRequest.GET('/end-point');
  }

  async submit(data: any) {
    return await this.httpRequest.POST('/end-point', data, { withFormData: true });
  }

  async update(id: string, data: any) {
    return await this.httpRequest.PUT(`/end-point/${id}`, data, { withFormData: true });
  }

  async updateWithFormData(id: string, data: any) {
    return await this.httpRequest.PUT(`/end-point/${id}`, data, { withFormData: true });
  }
}
