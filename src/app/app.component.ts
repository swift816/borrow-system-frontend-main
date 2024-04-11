import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { EquipmentService } from './services/equipment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usjr-borrowing-system';

  opened: boolean = true;

  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}
