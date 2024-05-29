import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Workbook } from 'exceljs';
import { CsvExportServiceService } from 'src/app/services/csv-export-service.service';
import * as fs from 'file-saver';
@Component({
  selector: 'app-utility-cost-result',
  templateUrl: './utility-cost-result.component.html',
  styleUrls: ['./utility-cost-result.component.css']
})
export class UtilityCostResultComponent implements OnInit {
  @Input() costs: any={};
  @ViewChild('totalCostTable', { static: false }) totalCostTable!: ElementRef;
  resultHeading: string[]=['Conditon(s)','County','Cost per case','Utility loss per case','Rates','Cases','Utility Loss','Total Utility Cost','Health Care Costs', 'Total Cost'];

  constructor(private csvExportService : CsvExportServiceService,private cdRef: ChangeDetectorRef) { 
   
  }
ngAfterViewInit(){
  setTimeout(() => {
    this.costs['Counties'].conditions =  this.costs['Counties'].conditions.replace(/,\s*/g, ', ');
    this.costs['Counties'].county =  this.costs['Counties'].county.replace(/,\s*/g, ', ');
    this.costs['Totals'].conditions =  this.costs['Totals'].conditions.replace(/,\s*/g, ', ');
    this.costs['Totals'].county =  this.costs['Totals'].county.replace(/,\s*/g, ', ');
    this.cdRef.detectChanges();  // Inform Angular to detect changes
  }, 100);

}
  ngOnInit(): void {
  }
  // downloadCSV() {
  //   const table = document.getElementById('totalCostTable');
  //   if (table) {
  //     this.csvExportService.exportTableToCsv(table, 'table_data');
  //   } else {
  //     console.error('Table element not found.');
  //   }
  //   }
    downloadCSV(): void {
      let workbook = new Workbook();
          const worksheet = workbook.addWorksheet('Total Cost');
          worksheet.addRow(['Conditon(s)','County','Cost per case','Utility loss per case','Rates','Cases','Utility Loss','Total Utility Cost','Health Care Costs', 'Total Cost']);

          worksheet.addRow([
          this.costs['Counties'].conditions,
          this.costs['Counties'].county,
          this.costs['Counties'].costPerCase,
          this.costs['Counties'].utilityLossPerCase,
          this.costs['Counties'].rates,
          this.costs['Counties'].cases,
          this.costs['Counties'].utilityLoss,
          this.costs['Counties'].costOfUtility,
          this.costs['Counties'].healthCareCost,
          this.costs['Counties'].totalCost,
          ])
          worksheet.addRow([
          this.costs['Totals'].conditions,
          this.costs['Totals'].county,
          this.costs['Totals'].costPerCase,
          this.costs['Totals'].utilityLossPerCase,
          this.costs['Totals'].rates,
          this.costs['Totals'].cases,
          this.costs['Totals'].utilityLoss,
          this.costs['Totals'].costOfUtility,
          this.costs['Totals'].healthCareCost,
          this.costs['Totals'].totalCost,
          ])
      
      workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          fs.saveAs(blob, 'total_Data');
        });

  }

}
