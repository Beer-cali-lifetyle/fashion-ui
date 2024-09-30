import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { timeout } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export interface Options {
  withFormData: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpServie {

  queryParams: any = {};
  private isBrowser: boolean;

  constructor(
    private httpClient: HttpClient, 
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      console.log(window.navigator.onLine ? 'Internet Connection Enabled' : 'Internet Connection Disabled');
    }
  }

  /**
   * Perform a get request to the API
   */
  async GET( endpoint: string, params: any = {}): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.queryParams = params;
        const result = this.httpClient.get(HttpServie.getApiUrl() + endpoint, await this.buildRequestOptions())
          .pipe();
        result.subscribe(async (response: any) => {
          resolve(response);
        });
        this.queryParams = {};
      } catch (e) {
        console.log('Caught exception in GET request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
   * Perform a post request to the server.
   */
  async POST( endpoint: string, data: any | FormData = null, options: Options = { withFormData: false }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: Observable<any>;
      try {
        result = await this.httpClient.post(HttpServie.getApiUrl() + endpoint, data, await this.buildRequestOptions(options)).pipe();
        result.subscribe(async (response: any) => {
          resolve(response);
          return;
        });
      } catch (e) {
        console.log('Caught exception in POST request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
   * Perform a put request to the server.
   */
  async PUT( endpoint: string, data: any | FormData = null, options: Options = { withFormData: false }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: Observable<any>;
      try {
        result = await this.httpClient.put(HttpServie.getApiUrl() + endpoint, data, await this.buildRequestOptions(options)).pipe();
        result.subscribe(async (response: any) => {
          resolve(response);
          return;
        });
      } catch (e) {
        console.log('Caught exception in PUT request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
   * Perform a delete request to the server.
   */
  async DELETE( endpoint: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: Observable<any>;
      try {
        result = await this.httpClient.delete(HttpServie.getApiUrl() + endpoint, await this.buildRequestOptions()).pipe();
        result.subscribe(async (response: any) => {
          resolve(response);
          return;
        });
      } catch (e) {
        console.log('Caught exception in DELETE request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
   * Perform a download request to the server.
   */
  BLOB(Url: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = this.httpClient.get(Url, { responseType: 'blob' }).pipe();
        result.subscribe(async (response: any) => {
          resolve(response);
        });
      } catch (e) {
        console.log('Caught exception in DOWNLOAD request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
   * Generate the request options for all HttpClient calls.
   */
  private async buildRequestOptions($options: Options = { withFormData: false }, $headers: any = {}) {
    return { headers: await this.buildHeaders($options, $headers), params: await this.buildQueryParams(), withCredentials: true };
  }

  /**
   * Generate the headers required for all requests.
   */
  private async buildHeaders($options: Options, $headers: any = {}) {
    const headers: { Authorization?: string, 'Content-Type'?: string } = {
      'Content-Type': 'application/json'
    };

    if ($options?.withFormData) {
      delete headers['Content-Type'];
    }

    if (this.isBrowser && this.cookieService.get('access_token')) {
      headers.Authorization = 'Bearer ' + this.cookieService.get('access_token');
    }

    return new HttpHeaders(headers);
  }

  private async buildQueryParams() {
    let httpParams = new HttpParams();
    Object.keys(this.queryParams).forEach((key) => {
      httpParams = httpParams.append(key, this.queryParams[key]);
    });
    return httpParams;
  }

  /**
   * Get the API URL from environment settings.
   */
  private static getApiUrl(): string {
    return environment.api.base_url;
  }
}
