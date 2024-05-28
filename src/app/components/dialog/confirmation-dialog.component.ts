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
  search: number = 0;
  selectedOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmationDialog>) {
      if(data){
        this.message = data.message || this.message;
        this.dataList = data.dataList || this.dataList;
        let selectObj = {
          id: 0,
          name : 'Select All',
          checked : false
        }
        
        // if (data.message === 'COUNTIES' && data.search === 2) {
        //   this.search = 2; // Radio buttons
        //   console.log(this.search)
        // } else {
        //   this.search = 1; // Checkboxes
        //   console.log(this.search) }
        this.selectedOptions = [...this.dataList.filter((obj: { checked: boolean; })=> obj.checked == true)]
        if(this.selectedOptions.length === this.dataList.length){
          selectObj['checked'] = true
          this.selectedOptions.push(selectObj)
        }else{
          selectObj['checked'] = false
        }
        if(this.data.search  === 2 && (this.data.message === 'COUNTIES')){
          this.selectedOptions.pop()
        }
        else if(this.data.search === 1 && (this.data.message === 'REGIONS')){
          this.dataList.push(selectObj)
        }
        else if(this.data.search === 2 && (this.data.message === 'DISEASES')){
          this.selectedOptions.pop()
        }
        else{
          this.dataList.push(selectObj)
        }
        
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
  }
  isSelectionRadio(data:any){
    if(this.data.search  === 2 && (this.data.message === 'COUNTIES')){
      return true
    }
    else if(this.data.search === 1 && (this.data.message === 'REGIONS')){
      return false
    }
    else if(this.data.search === 2 && (this.data.message === 'DISEASES')){
      return true
    }
    else{
      return false
    }

  }
  selectData(event:any,data: { id: '', name: '',checked:boolean }) {
    if(String(data['name']) === 'Select All'){
      this.selectAll(event,data)
    }else{
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
    
  }
  selectOption(option: any) {
    option.checked = true
    this.selectedOptions = [option];
  }
  onCancelClick(){
    this.dataList.forEach(ele=>{
      ele.checked = false
    })
    this.selectedOptions = this.dataList.filter((obj: { checked: boolean; })=> obj.checked == true)
    this.dialogRef.close([]);
  }
onConfirmClick(): void {
  const index = this.selectedOptions.findIndex(obj => obj['name'] === 'Select All')
  if(index > -1){
    this.selectedOptions.splice(index, 1)
  }

    this.dialogRef.close(this.selectedOptions);
}
slectAll(){
  this.dataList.forEach(ele=>{
    ele.checked = true
  })
  this.selectedOptions = this.dataList.filter((obj: { checked: boolean; })=> obj.checked == true)
}
  selectAll(event,data){
    if(event.checked){
      this.dataList.forEach(ele=>{
        ele.checked = true
      })
      this.selectedOptions = this.dataList.filter((obj: { checked: boolean; })=> obj.checked == true)
    }else{
      this.clearAll()
    }
    
  }
  clearAll(){
    this.dataList.forEach(ele=>{
      ele.checked = false
    })
    this.selectedOptions = this.dataList.filter((obj: { checked: boolean; })=> obj.checked == true)
  }
}