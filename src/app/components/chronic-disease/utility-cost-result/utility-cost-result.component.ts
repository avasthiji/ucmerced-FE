import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-utility-cost-result',
  templateUrl: './utility-cost-result.component.html',
  styleUrls: ['./utility-cost-result.component.css']
})
export class UtilityCostResultComponent implements OnInit {
  @Input() roiData: any[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
