import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-utility-cost-result',
  templateUrl: './utility-cost-result.component.html',
  styleUrls: ['./utility-cost-result.component.css']
})
export class UtilityCostResultComponent implements OnInit {
  @Input() costs: any={};
  resultHeading: string[]=['Conditon(s)','County','Cost per case','Utility loss per case','Rates','Cases','Utility Loss','Health Care Costs', 'Total Cost'];

  constructor() { }

  ngOnInit(): void {
  }

}
