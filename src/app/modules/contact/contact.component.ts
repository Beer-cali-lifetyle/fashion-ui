import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from "../script-load/script-load.component";
import { ApiService } from '../../shared/services/api.service';
import { AppBase } from '../../../app-base.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UiToasterService } from '../../core/services/toaster.service';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [ScriptLoadComponent, CommonModule, ReactiveFormsModule]
})
export class ContactComponent extends AppBase implements OnInit {

  constructor(
    private ApiService: ApiService,
    private toaster: UiToasterService,
    private fb: FormBuilder
  ) {
    super();
  }

  async ngOnInit() {
    anime({
      targets: '.animated-element',  // Change this to your element selector
      translateY: [0, 0],
      opacity: [0, 1],
      duration: 600,
      delay: 100,
      easing: 'easeOutQuad',
      stagger: 150 // For staggered animations
    });
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      phNo: ['']
    })
  }

  async onSubmit() {
    if (this.form.valid) {
      await this.ApiService.contactUs(this.form.value).then(res => {
        this.toaster.Success('Contact query sent successfully');
        this.form.reset();
      })
    } else { this.validateForm(); }
  }

}
