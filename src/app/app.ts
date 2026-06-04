import { Component} from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/shared/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
}