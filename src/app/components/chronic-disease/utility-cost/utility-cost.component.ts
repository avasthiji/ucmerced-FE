import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-utility-cost',
  templateUrl: './utility-cost.component.html',
  styleUrls: ['./utility-cost.component.css']
})
export class UtilityCostComponent implements OnInit {
  @Input() roiData: any[]=[];
  @Input() costData:any ;
  constructor() { 
    console.log(this.costData)
  }
  ngOnInit(): void {
  }
ngAfterViewInit(){
}
}
