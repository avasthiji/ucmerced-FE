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



}
