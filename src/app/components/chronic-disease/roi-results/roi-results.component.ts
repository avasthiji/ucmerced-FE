import { Component, OnInit ,Input, ChangeDetectorRef} from '@angular/core';
@Component({
  selector: 'app-roi-results',
  templateUrl: './roi-results.component.html',
  styleUrls: ['./roi-results.component.css']
})
export class RoiResultsComponent implements OnInit {
  @Input() costData2: any ={}; 
  resultHeading: string[]=['Conditon(s)','County','Cost per case','Utility loss per case','Rates','Population','Cases','Utility Loss','Health Care Costs', 'Total Cost'];

  constructor(private cdRef: ChangeDetectorRef) {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.costData2['Counties'].conditions =  this.costData2['Counties'].conditions.replace(/,\s*/g, ', ');
      this.costData2['Counties'].county =  this.costData2['Counties'].county.replace(/,\s*/g, ', ');
      this.costData2['Totals'].conditions =  this.costData2['Totals'].conditions.replace(/,\s*/g, ', ');
      this.costData2['Totals'].county =  this.costData2['Totals'].county.replace(/,\s*/g, ', ');
      this.cdRef.detectChanges();  // Inform Angular to detect changes
    }, 100);
  
  }

}
