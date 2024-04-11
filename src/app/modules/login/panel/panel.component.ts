import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  accountId: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login(): void {
    if (this.authService.login(this.accountId, this.password)) {
      this.accountId = '';
      this.password = '';
    } else {
      console.log('Invalid credentials');
    }
  }
}
