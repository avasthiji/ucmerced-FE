import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
// import { CalculatorService } from 'src/app/services/calculator.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {ConfirmationDialog} from '../dialog/confirmation-dialog.component';
import { CalculatorService } from 'src/app/services/calculator.service';
import {countiesList, diseaseList, ethnicityList, regionList, roiResultFormat, resultData, dummyROIResult, dummyUtilityCostResult} from '../../services/mockData'
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
    allDiseasesName: any = [];
    roiForm: FormGroup;
    showCost: boolean = false;
    showRoi: boolean = false;
    availableCounties: any = [];
    totalCostResponse:any = { "Totals":{},"Counties":{}}
    regionList: any = [];
    ethnicityList: any = [];
    diseaseList: any = [];
    countiesList: any = [];
    ROIDATA = roiResultFormat;
    RESULTDATA = resultData;
    consolidateROIDATA: any[] = [];
    dummyROIResult = dummyROIResult;
    dummyUtilityCostResult = dummyUtilityCostResult
    consolidateCOSTDATA: any;
    currentIndex: number = 0;
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
        this.showRoi = false
        // this.createUtilityData(this.dummyUtilityCostResult)
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
            },(err)=>{
                // this.createUtilityData(this.dummyUtilityCostResult)
                this.showCost= false
                alert("No Data Found")
            })
        }
        
        
    }
    createUtilityData(data: any) {
        this.totalCostResponse = data
        this.showCost = true
        console.log(this.totalCostResponse)
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
        const region = [countyRegion.region.id]
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
            this.createData(this.resultsData['Total'])
        },(err)=>{
            // this.createData(this.dummyROIResult['Total'])
            this.showRoi= false
            alert("No Data Found")
            //TO_DO for error handling
        })
    }
    getCostData(i:number){
        return this.consolidateCOSTDATA[i]
    }
    createData(res: any) {
        //"Id":"CASES",
        this.showRoi = true
        this.consolidateROIDATA = [];
        this.consolidateCOSTDATA = []
        let keys = Object.keys(res)
        for(let i = 0; i < keys.length ; i++){
            let keyName = keys[i]
            let roiData = this.ROIDATA
            let costObj:any = {}
            costObj["county"]= res[keyName]['county'],
            costObj["costPerCaseInitial"]= res[keyName]['costPerCaseInitial'],
            costObj["costPerCaseAfterProgram"]= res[keyName]['costPerCaseAfterProgram']
            costObj["costPerCaseDiff"]= res[keyName]['costPerCaseDiff']
            costObj["utilityLossPerCaseInitial"]= res[keyName]['utilityLossPerCaseInitial']
            costObj["utilityLossPerCaseAfterProgram"]= res[keyName]['utilityLossPerCaseAfterProgram']
            costObj["utilityLossPerCaseDiff"]= res[keyName]['utilityLossPerCaseDiff']
            costObj["ratesInitial"]= res[keyName]['ratesInitial']
            costObj["ratesAfterProgram"]= res[keyName]['ratesAfterProgram']
            costObj["ratesDiff"]= res[keyName]['ratesDiff']
            costObj["populationInitial"]= res[keyName]['populationInitial']
            costObj["populationAfterProgram"]= res[keyName]['populationAfterProgram']
            costObj["populationDiff"]= res[keyName]['populationDiff']
            costObj["casesInitial"]= res[keyName]['casesInitial']
            costObj["casesAfterProgram"]= res[keyName]['casesAfterProgram']
            costObj["casesDiff"]= res[keyName]['casesDiff']
            costObj["utilityLossInitial"]= res[keyName]['utilityLossInitial']
            costObj["utilityLossAfterProgram"]= res[keyName]['utilityLossAfterProgram']
            costObj["utilityLossDiff"]= res[keyName]['utilityLossDiff']
            costObj["healthCareCostInitial"]= res[keyName]['healthCareCostInitial']
            costObj["healthCareCostAfterProgram"]= res[keyName]['healthCareCostAfterProgram']
            costObj["healthCareCostDiff"]= res[keyName]['healthCareCostDiff']
            costObj["totalCostInitial"]= res[keyName]['totalCostInitial']
            costObj["totalCostAfterProgram"]= res[keyName]['totalCostAfterProgram']
            costObj["totalCostDiff"]= res[keyName]['totalCostDiff']

            this.consolidateCOSTDATA.push(costObj)

            roiData[0]['without_program'] = res[keyName]['totalCasesWithoutProgram']
            roiData[0]['With_Program']= res[keyName]['totalCasesWithProgram']
            roiData[0]['Difference']= res[keyName]['totalCasesDiff']
    
            //"Id":"COSTS_WITHOUT_QALYS",
            roiData[1]['without_program'] = res[keyName]['totalCostWithoutQalyWithoutProgram']
            roiData[1]['With_Program']= res[keyName]['totalCostWithoutQalyWithProgram']
            roiData[1]['Difference']= res[keyName]['totalCostWithoutQalyDiff']
    
            //"Id":"COSTS_QALYS",
            roiData[2]['without_program'] = res[keyName]['totalCostWithQalyWithoutProgram']
            roiData[2]['With_Program']= res[keyName]['totalCostWithQalyWithProgram']
            roiData[2]['Difference']= res[keyName]['totalCostWithQalyDiff']
    
    
            //"Id":"QALYS",
            roiData[3]['without_program'] = res[keyName]['totalQaLYWithoutProgram']
            roiData[3]['With_Program']= res[keyName]['totalQalyWithProgram']
            roiData[3]['Difference']= res[keyName]['totalQalyDiff']
    
    
            //"Id":"INVESTMENT",
            roiData[4]['without_program'] = res[keyName]['investmentWithoutProgram']
            roiData[4]['With_Program']= res[keyName]['investmentWithProgram']
            roiData[4]['Difference']= res[keyName]['investmentDiff']
    
    
            //"Id":"ROI_WITHOUT_QALYS",
            roiData[5]['without_program'] = "-"
            roiData[5]['With_Program']= res[keyName]['roiwithoutQaly']
            roiData[5]['Difference']= res[keyName]['roiwithoutQaly']
    
            //"Id":"ROI_QALYS",
            roiData[6]['without_program'] = "-"
            roiData[6]['With_Program']= res[keyName]['roiwithQaly']
            roiData[6]['Difference']= res[keyName]['roiwithQaly']
    
           // "Id":"ROI_DISCOUNT",
            roiData[7]['without_program'] = "-"
            roiData[7]['With_Program']= res[keyName]['roidiscounted']
            roiData[7]['Difference']= res[keyName]['roidiscounted']

            this.consolidateROIDATA.push(roiData)
        }
       
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
    nextData(): void {
        if (this.currentIndex < this.consolidateROIDATA.length - 1) {
          this.currentIndex++;
        }
      }
    
      // Method to navigate to the previous data
      previousData(): void {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        }
      }
}