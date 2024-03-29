import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.css']
})
export class ConfirmationDialog {
  message: string = "Are you sure?"
  confirmButtonText = "Ok"
  cancelButtonText = "Cancel"
  dataList: any[] = []
 selectedOptions: {}[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmationDialog>) {
      if(data){
        this.message = data.message || this.message;
        this.dataList = data.dataList || this.dataList;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
  }
  selectData(data: { id: '', name: '' }) {
    if (this.selectedOptions.length > 0) {
      const index = this.selectedOptions.findIndex((obj: any) => obj['id'] === data['id'])
      if (index > -1) {
        this.selectedOptions.splice(index, 1)
      }
      else {
        this.selectedOptions.push(data)
      }
    }
    else {
      this.selectedOptions.push(data)
    }
    console.log(this.selectedOptions);
  }
  isEqual(obj1: any, obj2: any): boolean {
    // Implement your own logic to compare objects
    // For example, you can compare specific properties or use deep comparison
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  onConfirmClick(): void {
    console.log(this.selectedOptions)
    this.dialogRef.close(this.selectedOptions);
  }

}