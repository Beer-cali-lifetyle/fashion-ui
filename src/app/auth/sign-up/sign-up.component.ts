import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}