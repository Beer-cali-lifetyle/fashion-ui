import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ContextService {

    // Environment Related Context
    IsUat: WritableSignal<any> = signal(false);
    IsProduction: WritableSignal<any> = signal(false);
    IsDevelopment: WritableSignal<any> = signal(false);


    // Panel Current Session User Profile
    Profile: WritableSignal<any> = signal(null);

    // RBAC
    RBAC: WritableSignal<any> = signal([]);

    // Specific Route RBAC_POLICIES 
    RBAC_POLICIES: WritableSignal<any> = signal(null);

    // RBAC Menus
    ACTIVE_ROUTES: WritableSignal<any> = signal([]);

    // NOTIFICATIONS
    Notifications: WritableSignal<{ Count: number, Data: any[] }> = signal({ Count: 0, Data: [] });

    constructor() {
    }

    get getEnv() {
        return {
            IsUat: this.IsUat(),
            IsProduction: this.IsProduction(),
            IsDevelopment: this.IsDevelopment(),
        }
    }
}

