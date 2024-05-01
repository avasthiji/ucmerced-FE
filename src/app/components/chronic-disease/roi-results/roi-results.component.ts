import { Component, OnInit ,Input} from '@angular/core';
@Component({
  selector: 'app-roi-results',
  templateUrl: './roi-results.component.html',
  styleUrls: ['./roi-results.component.css']
})
export class RoiResultsComponent implements OnInit {
  @Input() costData2: any ={}; 
  resultHeading: string[]=['Conditon(s)','County','Cost per case','Utility loss per case','Rates','Population','Cases','Utility Loss','Health Care Costs', 'Total Cost'];

  constructor() {
    console.log(this.costData2)
   }

  ngOnInit(): void {
  }



}
