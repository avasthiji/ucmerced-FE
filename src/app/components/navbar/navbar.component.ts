import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showMobileNav: boolean = false;

  constructor() { }

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
}
