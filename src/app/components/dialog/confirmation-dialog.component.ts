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
        this.selectedOptions = this.dataList.filter((obj: { checked: boolean; })=> obj.checked == true)
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
  }
  selectData(event:any,data: { id: '', name: '',checked:boolean }) {
    console.log(data)
    data['checked'] = !data['checked']
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
  }
  onConfirmClick(): void {
    console.log(this.selectedOptions)
    this.dialogRef.close(this.selectedOptions);
  }
  slectAll(){
    this.dataList.forEach(ele=>{
      ele.checked = true
    })
    this.selectedOptions = this.dataList.filter((obj: { checked: boolean; })=> obj.checked == true)
  }
  clearAll(){
    this.dataList.forEach(ele=>{
      ele.checked = false
    })
    this.selectedOptions = this.dataList.filter((obj: { checked: boolean; })=> obj.checked == true)
  }
}