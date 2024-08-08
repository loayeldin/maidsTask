import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { AdminService } from './admin-service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private adminService:AdminService,private renderer: Renderer2, private el: ElementRef){}
  totalUsers!:number

  ngOnInit(){
    this.adminService.totalUsers.subscribe(data=>{
      this.totalUsers = data
      console.log(this.totalUsers);
      
    })
    // this.checkScreenSize();
  }





  // @HostListener('window:resize', ['$event'])
  // onResize(event: any): void {
  //   this.checkScreenSize();
  // }



  // private checkScreenSize(): void {
  //   const width = window.innerWidth;
  //   if (width < 1000) {
  //     this.closeNavBar();
  //   }
  // }



  // private closeNavBar(): void {
  //   const navbar = this.el.nativeElement.querySelector('nav');
  //   const rightSide = this.el.nativeElement.querySelector('.right-side');
  //   this.renderer.addClass(navbar, 'nav-hidden');
  //   this.renderer.addClass(rightSide, 'collapsed');
  // }
  toggleNavBar()
  {

    const navbar = this.el.nativeElement.querySelector('nav');
    const rightSide = this.el.nativeElement.querySelector('.right-side');
    navbar.classList.toggle('nav-hidden');
    rightSide.classList.toggle('collapsed');

  }
}
