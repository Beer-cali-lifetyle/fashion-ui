import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
