import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  accountId: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {
    this.authService.login(this.accountId, this.password).subscribe(
      success => {
        if (success) {
          this.accountId = '';
          this.password = '';
        } else {
          alert('Invalid credentials');
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
