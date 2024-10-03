import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { ScriptLoaderService } from '../services/script-loader.service';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderGuard implements CanActivateChild {
  constructor(private ScriptService: ScriptLoaderService) {

  }
  async canActivateChild(): Promise<boolean> {
    await this.ScriptService.loadScripts();
    return true;
  }

}
