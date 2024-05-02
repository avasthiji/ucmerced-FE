import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CsvExportServiceService } from 'src/app/services/csv-export-service.service';

@Component({
  selector: 'app-utility-cost-result',
  templateUrl: './utility-cost-result.component.html',
  styleUrls: ['./utility-cost-result.component.css']
})
export class UtilityCostResultComponent implements OnInit {
  @Input() costs: any={};
  @ViewChild('totalCostTable', { static: false }) totalCostTable!: ElementRef;
  resultHeading: string[]=['Conditon(s)','County','Cost per case','Utility loss per case','Rates','Cases','Utility Loss','Health Care Costs', 'Total Cost'];

  constructor(private csvExportService : CsvExportServiceService) { }

  ngOnInit(): void {
  }
  downloadCSV() {
    const table = document.getElementById('totalCostTable');
    if (table) {
      this.csvExportService.exportTableToCsv(table, 'table_data');
    } else {
      console.error('Table element not found.');
    }
    }
}
