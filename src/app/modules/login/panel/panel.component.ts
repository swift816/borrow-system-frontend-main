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
    this.authService.login(this.accountId, this.password).subscribe(
      success => {
        if (success) {
          this.accountId = '';
          this.password = '';
          // Optionally, navigate to another route or show a success message
        } else {
          console.log('Invalid credentials');
          // Optionally, show an error message
        }
      },
      error => {
        console.error('Login failed', error);
        // Optionally, show an error message
      }
    );
 }
}
