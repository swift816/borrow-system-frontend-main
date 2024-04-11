import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
  @ViewChild('section1') section1!: ElementRef;
  @ViewChild('section2') section2!: ElementRef;
  @ViewChild('section3') section3!: ElementRef;

  constructor(private router: Router, private renderer: Renderer2) { }

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
}
