import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showMobileNav: boolean = false;
  constructor(private  router: Router) {}

  div1: boolean = false;

  ngOnInit(): void {
  }

  div1Function() {
    if (this.div1 == true) {
      this.div1 = false;
    } else {
      this.div1 = true;
    }
  }

  showMobileNavBar() {
    this.showMobileNav = true;
  }
  hideMobileNavBar() {
    this.showMobileNav = false;
  }

  checkActiveRoute(data: any) {
    return this.router.url === data
  }
}
