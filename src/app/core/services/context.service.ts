import {
    Injectable,
    WritableSignal,
    signal,
    Inject,
    PLATFORM_ID,
    HostListener
  } from "@angular/core";
  import { isPlatformBrowser } from '@angular/common';
  
  interface User {
    id: number;
    name: string;
    email: string;
    // Add more fields as needed
  }
  
  @Injectable({ providedIn: 'root' })
  export class ContextService {
    user: WritableSignal<User | null> = signal(null);
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      this.loadFromLocalStorage();
    }
  
    private loadFromLocalStorage() {
      if (isPlatformBrowser(this.platformId)) {
        const storedUser = localStorage.getItem('user');
        if (storedUser !== null) {
          try {
            this.user.set(JSON.parse(storedUser));
          } catch (error) {
            console.error('Error parsing local storage for user:', error);
          }
        }
      }
    }
  
    @HostListener("window:beforeunload", ["$event"]) 
    unloadHandler(event: Event) {
      this.saveToLocalStorage();
    }
  
    saveToLocalStorage() {
      if (isPlatformBrowser(this.platformId)) {
        const currentUser = this.user();
        if (currentUser !== null) {
          localStorage.setItem('user', JSON.stringify(currentUser));
        }
      }
    }
  
    public clearLocalStorage() {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('user');
      }
    }
  }
  