import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvExportServiceService {

  constructor() { }
  exportTableToCsv(table: HTMLElement, filename: string) {
    const csv = this.convertToCsv(table);
    this.downloadCsv(csv, filename);
  }

  private convertToCsv(table: HTMLElement): string {
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvData = rows.map(row => {
      const columns = Array.from(row.querySelectorAll('th, td'));
      return columns.map(column => column.textContent?.trim()).join(',');
    });
    return csvData.join('\n');
  }

  private downloadCsv(csv: string, filename: string) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename + '.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
