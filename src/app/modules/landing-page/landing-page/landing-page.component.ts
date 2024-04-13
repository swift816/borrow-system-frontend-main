import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Filter } from 'src/app/models/Filter';
import { Pagination } from 'src/app/models/Pagination';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('panelTransition', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('logoTransition', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('200ms', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateY(100%)' }))
      ])
    ]),
    trigger('panelTransition2', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('panelTransition3', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class LandingPageComponent implements AfterViewInit {
  pagination: Pagination = {
    length: 100,
    page: 1,
    limit: 25,
    pageSizeOption: [5, 10, 25, 100],
  };
  greetings: string = 'CPE';
  equipmentlist: any = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
  searchedWord = '';
  opened: boolean = false;

  @ViewChild('section1') section1!: ElementRef;
  @ViewChild('section2') section2!: ElementRef;
  @ViewChild('section3') section3!: ElementRef;

  constructor(private router: Router, private renderer: Renderer2, private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => this.queryParamsHandler(params));
  }

  ngAfterViewInit(): void {
    this.checkElementsInView();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.checkElementsInView();
  }

  checkElementsInView(): void {
    const sections = [this.section1, this.section2, this.section3];

    sections.forEach(section => {
      if (section) {
        const sectionElement = section.nativeElement;
        const rect = sectionElement.getBoundingClientRect();
        const isInView = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (isInView) {
          this.animateSection(sectionElement);
        }
      }
    });
  }

  animateSection(element: HTMLElement): void {
    const sectionId = element.id;
    switch (sectionId) {
      case 'section1':
        this.renderer.addClass(element, 'animated-panel');
        break;
      case 'section2':
        this.renderer.addClass(element, 'animated-panel2');
        break;
      case 'section3':
        this.renderer.addClass(element, 'animated-panel3');
        break;
      default:
        break;
    }
  }

  directToLogin(): void {
    this.router.navigate(['/login']);
  }

  searchProduct(event: any) {
    console.log(event);
  }

  cartClicked() {
    this.opened = !this.opened;
  }

  getEquipmentList() {
    let filter: Filter = {
      searchWord: this.searchedWord,
    };
    this.equipmentService.getItems(this.pagination, filter).subscribe((resp) => {
      this.equipmentlist = resp.data;
    });
  }

  queryParamsHandler(params: Params) {
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.pagination.page = params['page'] ? params['page'] : 1;
    this.searchedWord = params['search'] ? params['search'] : '';
    this.getEquipmentList();
  }
}
