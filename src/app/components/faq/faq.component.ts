import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  // questions:Array=[
  //   {
  //     title:'How are the total cost estimates for each county calculated?',
  //     value:
  //   },
  //   {
  //     title:'Where did the initial cost estimates come from?'
  //     value: 
  //   },
  //   {
  //     title:'Where did the prevalence rates come from?'
  //     value:
  //   },
  //   {
  //     title:'Where did the initial cost estimates come from?'
  //     value:''
  //   },
  //   {
  //     title:
  //     value:
  //   },
  //   {
  //     title:
  //     value:
  //   },
  //   {
  //     title:
  //     value:
  //   }
  // ]
  constructor() { }

  ngOnInit(): void {
  }
  accordionClick(){
    console.log("15")
  }
}
