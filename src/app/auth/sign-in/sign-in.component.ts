import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { ApiService } from '../../shared/services/api.service';
import { AppBase } from '../../../app-base.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { ContextService } from '../../core/services/context.service';
import { CookieService } from 'ngx-cookie-service';

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
    SharedModule
  ]
})
export class SignInComponent extends AppBase {
  inputType = 'password';
  visible = false;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private ApiService: ApiService,
    private context: ContextService
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
      await this.ApiService.SignIn(this.form.value).then((res) => {
        this.context.Profile.set(res?.user)
        console.log(res)
        this.cookieService.set('access_token', res?.access_token)
        this.cookieService.set('user_id', res?.user?.id)
        // window.location.href = '/home';
        this.router.navigate(['/home']);
      })
    } else {
      this.validateForm();
    }
  }
}
