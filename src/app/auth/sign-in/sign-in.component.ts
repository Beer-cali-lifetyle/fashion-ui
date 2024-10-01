import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule, NgIf, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../shared/services/api.service';
import { AppBase } from '../../../app-base.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { ContextService } from '../../core/services/context.service';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class SignInComponent extends AppBase {
  inputType = 'password';
  visible = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
    private context: ContextService,
    private commonService: CommonService
  ) {
    super();
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.inputType = this.visible ? 'text' : 'password';
    this.cd.markForCheck();
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        const res = await this.apiService.SignIn(this.form.value);
        this.context.user.set(res?.user);

        // Use localStorage to store values only in the browser
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('access_token', res?.access_token);
          localStorage.setItem('user_id', res?.user?.id);
          localStorage.setItem('user', JSON.stringify(res?.user)); // Store as string
        }

        this.commonService.goToPage('/home');
      } catch (error) {
        console.error('Sign-in error:', error);
        // Handle error appropriately (e.g., show a notification or message to the user)
      }
    } else {
      this.validateForm();
    }
  }
}
