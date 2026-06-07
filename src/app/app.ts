import { Component , inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  private authService = inject(AuthService);

  constructor() {

  this.authService.loadRole();
  this.authService.loadUsername();

}
}