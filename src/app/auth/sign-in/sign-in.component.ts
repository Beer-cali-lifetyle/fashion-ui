import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  PLATFORM_ID,
  Inject,
  OnInit,
  ElementRef
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule, NgIf, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../shared/services/api.service';
import { AppBase } from '../../../app-base.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { ContextService } from '../../core/services/context.service';
import { CommonService } from '../../shared/services/common.service';
import { ScriptLoadComponent } from '../../modules/script-load/script-load.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    SharedModule,
    RouterModule,
    ScriptLoadComponent
  ]
})
export class SignInComponent extends AppBase implements OnInit {
  inputType = 'password';
  visible = false;
  signUpForm!: FormGroup;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
    private context: ContextService,
    private el: ElementRef
  ) {
    super();

  }

  toggle() {
    const container = document.getElementById('container');
    container?.classList.toggle('sign-in');
    container?.classList.toggle('sign-up');
  }

  ngOnInit(): void {
    setTimeout(() => {
      const container = document.getElementById('container');
      container?.classList.add('sign-in');
    }, 0);
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'password_confirmation') });
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.inputType = this.visible ? 'text' : 'password';
    this.cd.markForCheck();
  }

  async signIn() {
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
        this.router.navigate(['/home'])
      } catch (error) {
        console.error('Sign-in error:', error);
        // Handle error appropriately (e.g., show a notification or message to the user)
      }
    } else {
      this.validateForm();
    }
  }

  
  mustMatch(password: string, password_confirmation: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[password_confirmation];

      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }


  async onSignup() {
    if (this.form.valid) {
      try {
        const res = await this.apiService.SignUp(this.form.value);
        this.context.user.set(res?.user);
          localStorage.setItem('access_token', res?.access_token);
          localStorage.setItem('user_id', res?.user?.id);
          localStorage.setItem('user', JSON.stringify(res?.user));
        this.router.navigate(['/home'])
      } catch (error) {
        console.error('Sign-in error:', error);
      }
    } else {
      this.validateForm();
    }
  }
}
