import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
// import { CalculatorService } from 'src/app/services/calculator.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {ConfirmationDialog} from '../dialog/confirmation-dialog.component';
import { CalculatorService } from 'src/app/services/calculator.service';
import {countiesList, diseaseList, ethnicityList, regionList, roiResultFormat, resultData} from '../../services/mockData'
@Component({
    selector: 'app-chronic-disease',
    templateUrl: './chronic-disease.component.html',
    styleUrls: ['./chronic-disease.component.css']
})
export class ChronicDiseaseComponent implements OnInit {
    
    searchOptions = [
        { key: 1, value: 'Total Cost' },
        { key: 2, value: 'Roi Calculator' }
    ]
    activeTab: any='';
   
    selectedSearch = 1
    isMaleChecked: boolean = false
    isFemaleChecked: boolean = false
    selectedRegions: any[] = [];
    selectedEthnicity: any= []
    selectedDiseases:any[] = []
    selectedCounties: any[] = []
    selectedCounty :{name:''} ={
        name: ''
    }
    endAge = 0
    startAge = 0
  

    tabs: any = [];
    resultsData: any = [];
    EthnicityData: any = {};
    RegionData: any = {};
    Object = Object;
    GenderData: any = {};
    utilityCostData: any = {};
    roiGuidelinesHeading = ['Condition(s)','County', 'Cost per case', 'Utility loss per case' , 'Rates', 'Cases', 'Health Care Cost', 'Utility loss', 'Total cost (Healthcare and utility loss)']
    resultHeading = ['Condition(s)', 'County', 'Cost per case', 'Utility loss per case', 'Rates', 'Population', 'Cases', 'Utility loss', 'Health Care Cost', 'Total cost (Healthcare and utility loss)']
    investmentHeading = ['Without Program', 'With Program', 'Difference', 'Description']
    allDiseasesName: any = [];
    roiForm: FormGroup;
    showCost: boolean = false;
    showRoi: boolean = true;
    availableCounties: any = [];
    totalCostResponse:any = { "Totals":{},"Counties":{}}
    regionList: any = [];
    ethnicityList: any = [];
    diseaseList: any = [];
    countiesList: any = [];
    ROIDATA = roiResultFormat;
    RESULTDATA = resultData;
    constructor(private fb: FormBuilder,private dialog: MatDialog,private calculatorService : CalculatorService) {
        this.roiForm = this.fb.group({
            sizeOfTargetGroup: ['', Validators.required],
            initialProgramCosts: ['', Validators.required],
            anticipatedEffectivenessOfProgram: ['', Validators.required],
            ongoingProgramCosts: ['', Validators.required],
            expectedTimeframesForResults: ['', Validators.required],
            discountRate: ['', Validators.required],
            expectedTimeframesForROI: ['', Validators.required],
            programDuration: ['', Validators.required],
            valueOfQALY: ['', Validators.required]
          });
          this.ethnicityList.forEach((ele: { [x: string]: boolean; })=>{
            ele['checked'] =  false
          })
          this.regionList.forEach((ele: { [x: string]: boolean; })=>{
            ele['checked'] =  false
          })
          this.countiesList.forEach((ele: { [x: string]: boolean; })=>{
            ele['checked'] =  false
          })
          this.diseaseList.forEach((ele: { [x: string]: boolean; })=>{
            ele['checked'] =  false
          })
     }
     roiGuidelinesData = [
        {
                                                   
            "Conditions": 0,
            "County": "ASIAN",
            "Cost_per_case": "$32",
            "Utility_loss_per_case": "$2",
            "Rates": "4%",
            "Cases": "Coronary Heart Disease (CHD)",
            "Health_Care_Cost": "$333",
            "Utility_loss": "$21",
            "Total_cost_Healthcare_and_utility_loss":"$53",
        },
        {
                                                   
            "Conditions": 0,
            "County": "Japan",
            "Cost_per_case": "$32",
            "Utility_loss_per_case": "$2",
            "Rates": "4%",
            "Cases": "Coronary Heart Disease (CHD)",
            "Health_Care_Cost": "$333",
            "Utility_loss": "$21",
            "Total_cost_Healthcare_and_utility_loss":"$53",
        },
        {
                                                   
            "Conditions": 0,
            "County": "Australia",
            "Cost_per_case": "$32",
            "Utility_loss_per_case": "$2",
            "Rates": "4%",
            "Cases": "Coronary Heart Disease (CHD)",
            "Health_Care_Cost": "$333",
            "Utility_loss": "$21",
            "Total_cost_Healthcare_and_utility_loss":"$53",
        },
     ]

    
  
     setActiveTab(tab:any) {
        this.activeTab = tab;
      }
      removeEthnicity(ethnicityToRemove: any): void {
        console.log(ethnicityToRemove)
        this.selectedEthnicity = this.selectedEthnicity.filter((selectedEthnicity: any) => selectedEthnicity !== ethnicityToRemove);
      }
     openDialog(data:any) {
       
        var messagetype = ''
        var selectedItems;
        var dataListtype = this.ethnicityList
        if(data == 'ethnicity'){
            messagetype = 'ETHNICITY'
            dataListtype = this.ethnicityList
        }else if(data == 'region'){
            messagetype = 'REGIONS'
            dataListtype = this.regionList
        }else if(data == 'counties'){
            messagetype = 'COUNTIES'
            dataListtype = this.availableCounties
        }else if(data == 'disease'){
            messagetype = 'DISEASES'
            dataListtype = this.diseaseList
            
        }
        const dialogRef = this.dialog.open(ConfirmationDialog,{
            maxHeight: "90vh",
          data:{
            message: messagetype,
            dataList:dataListtype,
            search:this.selectedSearch
          }
        });
        dialogRef.afterClosed().subscribe((selectedItems: any) => {
            if(selectedItems.length == 0){
                return
            }
            if (messagetype == 'ETHNICITY') {
                this.selectedEthnicity = selectedItems;
            }
            else if (messagetype == 'REGIONS') {
                this.selectedRegions = selectedItems
                this.onRegionSelectionChange(this.selectedRegions)
            } else if (messagetype == 'COUNTIES') {
                this.selectedCounties = selectedItems 
                // }
            } else if (messagetype == 'DISEASES') {
                this.selectedDiseases = selectedItems
            } 
        });
    }
    removeItemFromArray(item: any, array: any[],arrayName=''): void {
        const index = array.indexOf(item);
        if (index !== -1) {
          array.splice(index, 1);
        }
        if(arrayName === 'region'){
            this.onRegionSelectionChange(array)
        }
        console.log(array)
      }
    removeItem(event: Event,item: any, array: any[],arrayName = ''): void {
        event.stopPropagation(); // Prevent propagation of the click event
        this.removeItemFromArray(item, array,arrayName);
      }
    ngOnInit(): void {
        this.getEthnicity()
       //this.getAgegroup()
        this.getCounties()
        this.getDiseases()
        this.getRegions()
    }
    getRegions(){
        this.calculatorService.getRegions().subscribe(res=>{
            console.log("res")
            this.regionList = res
        },(err)=>{
            this.regionList = regionList
        })
    }
    getEthnicity(){
        this.calculatorService.getEthnicity().subscribe(res=>{
            console.log("res")
            this.ethnicityList = res
        },(err)=>{
            this.ethnicityList = ethnicityList
        })
    }
    getDiseases(){
        this.calculatorService.getDiseases().subscribe(res=>{
            console.log("res")
            this.diseaseList = res
        },(err)=>{
            this.diseaseList = diseaseList
        })
    }
    getCounties(){
        this.calculatorService.getCounties().subscribe(res=>{
            console.log("res")
            this.countiesList = res
            this.availableCounties = res
        },(err)=>{
            this.countiesList = countiesList
            this.availableCounties = countiesList
        })
    }

    onRegionSelectionChange(selectedRegion:any[]) {
      let arrayOfArrays: any[] = []
        selectedRegion.forEach((ele)=>{
            let selectedCounty =  this.countiesList.filter((obj: { region: { id: any; }; })=> obj.region.id === ele.id)
            arrayOfArrays.push(selectedCounty)
            this.availableCounties = []
           this.availableCounties = [].concat(...arrayOfArrays);
        })
    }
    utilityCost(isCSV = false) {
       
        const region = this.selectedRegions.map((obj)=> obj.id)
        const county = this.selectedCounties.map((obj)=> obj.id)
        const ethnicity = this.selectedEthnicity.map((obj: { id: any; })=> obj.id)
        const disease = this.selectedDiseases.map((obj)=> obj.id)
       
       const sex = []
        if(this.isFemaleChecked){
            sex.push('Female')
       }
       if(this.isMaleChecked){
        sex.push('Male')
       }
        let data = {
            "region": region.join(","),
            "county": county.join(","),
            "disease": disease.join(","),
            "ethnicity": ethnicity.join(","),
            "ageGroup": `${this.startAge}-${this.endAge}`,
            "sex": sex.join(","),
        }
        if(isCSV){

        }else{
            this.calculatorService.utilityCost(data).subscribe(res=>{
                this.createUtilityData(res)
                this.showCost = true
            })
        }
        
        
    }
    createUtilityData(data: any) {
        this.totalCostResponse = data
    }
    checkIsDataAvailable(){
        if(this.Object.keys(this.totalCostResponse['Totals']).length > 0){
            return true
        }
        return false
    }
    roiCalculator() {
       
        
        const county = this.selectedCounties.map((obj)=> obj.id)
        const countyRegion = this.countiesList.find((obj: { id: any; })=> obj.id === county[0])
        const region = countyRegion.region.id
        const ethnicity = this.selectedEthnicity.map((obj: { id: any; })=> obj.id)
        const disease = this.selectedDiseases.map((obj)=> obj.id)
       
       const sex = []
        if(this.isFemaleChecked){
            sex.push('Female')
       }
       if(this.isMaleChecked){
        sex.push('Male')
       }
        let data = {
            "county": county.join(","),
            "region": region.join(","),
            "disease": disease.join(","),
            "sex": sex.join(","),
            "ethnicity":ethnicity.join(","),
            "ageLimit":  `${this.startAge}-${this.endAge}`,
            "sizeOfGroup":this.roiForm.value.sizeOfTargetGroup,
            "anticipatedEffectivenessOfProgram": this.roiForm.value.anticipatedEffectivenessOfProgram,
            "anticipatedTimeForEffectivenessOfProgram": this.roiForm.value.expectedTimeframesForResults,//
            "numberOfYearsForROI" : this.roiForm.value.expectedTimeframesForROI,//
            "initialProgramCost" :this.roiForm.value.initialProgramCosts,
            "ongoingProgramCost" : this.roiForm.value.ongoingProgramCosts,
            "operationalPeriodOfProgram" :this.roiForm.value.programDuration,//
            "discountRate": this.roiForm.value.discountRate,
            "valueOfQaly": this.roiForm.value.valueOfQALY
        }

        this.calculatorService.roiCalcuator(data).subscribe(res => {
            this.resultsData = res
            this.createData(this.resultsData)
        },(err)=>{
            //TO_DO for error handling
        })
    }
    createData(res: any) {
        //"Id":"CASES",
        this.ROIDATA[0]['without_program'] = res['totalCasesWithoutProgram']
        this.ROIDATA[0]['With_Program']= res['totalCasesWithProgram']
        this.ROIDATA[0]['Difference']= res['totalCasesDiff']

        //"Id":"COSTS_WITHOUT_QALYS",
        this.ROIDATA[1]['without_program'] = res['totalCostWithoutQalyWithoutProgram']
        this.ROIDATA[1]['With_Program']= res['totalCostWithoutQalyWithProgram']
        this.ROIDATA[1]['Difference']= res['totalCostWithoutQalyDiff']

        //"Id":"COSTS_QALYS",
        this.ROIDATA[2]['without_program'] = res['totalCostWithQalyWithoutProgram']
        this.ROIDATA[2]['With_Program']= res['totalCostWithQalyWithProgram']
        this.ROIDATA[2]['Difference']= res['totalCostWithQalyDiff']


        //"Id":"QALYS",
        this.ROIDATA[3]['without_program'] = res['totalQaLYWithoutProgram']
        this.ROIDATA[3]['With_Program']= res['totalQalyWithProgram']
        this.ROIDATA[3]['Difference']= res['totalQalyDiff']


        //"Id":"INVESTMENT",
        this.ROIDATA[4]['without_program'] = res['investmentWithoutProgram']
        this.ROIDATA[4]['With_Program']= res['investmentWithProgram']
        this.ROIDATA[4]['Difference']= res['investmentDiff']


        //"Id":"ROI_WITHOUT_QALYS",
        this.ROIDATA[5]['without_program'] = "-"
        this.ROIDATA[5]['With_Program']= res['roiwithoutQaly']
        this.ROIDATA[5]['Difference']= res['roiwithoutQaly']

        //"Id":"ROI_QALYS",
        this.ROIDATA[0]['without_program'] = "-"
        this.ROIDATA[0]['With_Program']= res['roiwithQaly']
        this.ROIDATA[0]['Difference']= res['roiwithQaly']

       // "Id":"ROI_DISCOUNT",
        this.ROIDATA[0]['without_program'] = res['totalCasesWithoutProgram']
        this.ROIDATA[0]['With_Program']= res['roidiscounted']
        this.ROIDATA[0]['Difference']= res['roidiscounted']
    }
    tabChanged(event: any): void {
        // You can perform actions based on tab change if needed
        console.log('Tab changed:', event.tab.textLabel);
        this.showCost = false
    }
   
    getValue(data: any) {
        return data
    }
    getTableHeadings(data: any) {
        return Object.keys(data.value[0])
    }
    getTableRecords(data: any) {
        // console.log(data)
        return data.value
    }
    getDiseaseValue(diseaseName: string) {
        // console.log(diseaseName)
        return this.utilityCostData.diseases.find((obj: any) => obj.name === diseaseName)
    }
    doReset(){
        window.location.reload();
    }
    resetFields() {
        this.selectedRegions = [];
        this.selectedEthnicity= []
        this.selectedDiseases= []
        this.selectedCounties = []
        this.isFemaleChecked = false;
        this.isMaleChecked = false;
        this.endAge = 0;
        this.startAge =0;
        this.roiForm.reset();
        this.showCost = false;
        this.ethnicityList.forEach((ele: { [x: string]: boolean; })=>{
            ele['checked'] =  false
          })
          this.regionList.forEach((ele: { [x: string]: boolean; })=>{
            ele['checked'] =  false
          })
          this.countiesList.forEach((ele: { [x: string]: boolean; })=>{
            ele['checked'] =  false
          })
          this.diseaseList.forEach((ele: { [x: string]: boolean; })=>{
            ele['checked'] =  false
          })
          this.tabs = []
      }
    getRoiGuidelinesHeading() {
        return this.roiGuidelinesHeading;
    }
    getRoiGuidelinesData() {
        return this.roiGuidelinesData;
    }


    copyTable() {
        const table = document.getElementById('userTable1');

        if (table) {
            const range = document.createRange();
            range.selectNode(table);

            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);

                try {
                    // Copy selected content to clipboard
                    const successful = document.execCommand('copy');
                    if (successful) {
                        console.log('Table content copied to clipboard.');
                    } else {
                        console.error('Failed to copy table content to clipboard.');
                    }
                } catch (err) {
                    console.error('Error copying table content to clipboard:', err);
                } finally {
                    selection.removeAllRanges();
                }
            }
        } else {
            console.error('Table element with ID "userTable1" not found.');
        }
    }

    downloadCSV(fileName: string) {
        this.utilityCost(true)
    }      
    convertTableToCSV(table: HTMLElement): string {
        let csvContent = '';
        const rows = table.querySelectorAll('tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td, th');
            cells.forEach((cell, index) => {
                const cellText = cell.textContent;
                if (cellText !== null && cellText !== undefined) {
                    csvContent += index ? ',' : '';
                    csvContent += '"' + cellText.trim().replace(/"/g, '""') + '"';
                }
            });
            csvContent += '\n';
        });

        return csvContent;
    }
    onEndAgeChange(value: number){
        if (value > 80) {
            this.endAge = 80;
        } else {
            this.endAge = value;
        }
    }
}