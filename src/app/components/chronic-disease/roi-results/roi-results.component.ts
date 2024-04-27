import { Component, OnInit ,Input} from '@angular/core';
@Component({
  selector: 'app-roi-results',
  templateUrl: './roi-results.component.html',
  styleUrls: ['./roi-results.component.css']
})
export class RoiResultsComponent implements OnInit {
  @Input() resultData: any[] =[]; 
  @Input() resultHeading: string[]=[];

  constructor() { }

  ngOnInit(): void {
  }
 
downloadCSV(fileName: string) {
  const tableElement = document.getElementById('roiTable');
  
  if (tableElement) {
      const table = tableElement as HTMLTableElement;

      const csvData: string[] = [];

      Array.from(table.rows).forEach(row => {
          const csvRow: string[] = [];
          Array.from(row.cells).forEach(cell => {
              const cellData = cell.textContent ? cell.textContent.replace(/"/g, '""') : '';
              csvRow.push(`"${cellData}"`);
          });
          csvData.push(csvRow.join(','));
      });

      const csvContent = csvData.join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });

      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.csv`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      
  } else {
      console.error('Table element with ID "roiTable" not found.');
  }
}


}
