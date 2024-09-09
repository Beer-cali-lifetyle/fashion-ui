import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
