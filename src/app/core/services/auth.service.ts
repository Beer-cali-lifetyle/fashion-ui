import { Injectable } from '@angular/core';
import { ContextService } from './context.service';
import { ApiService } from '../../shared/services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private ApiService: ApiService,
        public contextService: ContextService,
        private cookieService: CookieService) {
    }

    async isTokenValid() {
        const token = this.getToken() || false;
        const user_id = await this.getUser();
        if (token && user_id) {
            return true
        }
        return false;
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    setToken(token: string): void {
        localStorage.setItem('access_token', token);
    }

    removeToken(): void {
        localStorage.removeItem('access_token');
    }

    async getUser() {
        const user = await this.contextService.Profile();
        if (!user) {
            const userId = this.cookieService.get('user_id')
            try {
                const response = await this.ApiService.getUserDetails(userId);
                this.contextService.Profile.set(response);
                return response;
            } catch (error) {
                console.error('Error getting user role:', error);
                return null;
            }
        }
    }

}



