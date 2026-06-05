import { Component } from '@angular/core';
import { ClientNavbarComponent} from '../shared/navbar-client/client-navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ClientNavbarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}
