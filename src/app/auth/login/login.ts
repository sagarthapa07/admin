import { Component } from '@angular/core';
import { App } from '../../app';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
constructor(private app: App) {}

ngOnInit() {
  this.app.showHeader = false;
}

ngOnDestroy() {
  this.app.showHeader = true;
}




}
