import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appResizeNav]'
})
export class ResizeNavDirective  implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.checkScreenSize();
 
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();

  }

  private checkScreenSize(): void {
    const width = window.innerWidth;
    if (width < 1100) {
      this.closeNavBar();

    
      
    }
  }

  private closeNavBar(): void {
    const navbar = this.el.nativeElement.querySelector('nav');
    const rightSide = this.el.nativeElement.querySelector('.right-side');
    this.renderer.addClass(navbar, 'nav-hidden');
    this.renderer.addClass(rightSide, 'collapsed');
  }


}
