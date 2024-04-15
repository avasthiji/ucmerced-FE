import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ucmerced';
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'copy-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/svg-icons/copy-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'csv-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/svg-icons/csv-file-icon.svg')
    );
  
}
}