import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialog } from '../dialog/confirmation-dialog.component';
import { CalculatorService } from 'src/app/services/calculator.service';
import { countiesList, diseaseList, ethnicityList, regionList, roiResultFormat, resultData, dummyROIResult, dummyUtilityCostResult } from '../../services/mockData'
import { CsvExportServiceService } from 'src/app/services/csv-export-service.service';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Component({
    selector: 'app-chronic-disease',
    templateUrl: './chronic-disease.component.html',
    styleUrls: ['./chronic-disease.component.css']
})
export class ChronicDiseaseComponent implements OnInit {

    searchOptions = [
        { key: 1, value: 'Total Cost' },
        { key: 2, value: 'ROI Calculator' }
    ]
    activeTab: any = '';

    selectedSearch = 1
    isMaleChecked: boolean = false
    isFemaleChecked: boolean = false
    selectedRegions: any[] = [];
    selectedEthnicity: any = []
    selectedDiseases: any[] = []
    selectedCounties: any[] = []
    selectedCounty: { name: '' } = {
        name: ''
    }
    endAge:any = 18
    startAge:any = 18


    tabs: any = [];
    resultsData: any = [];
    EthnicityData: any = {};
    RegionData: any = {};
    Object = Object;
    GenderData: any = {};
    utilityCostData: any = {};
    roiGuidelinesHeading = ['Condition(s)', 'County', 'Cost per case', 'Utility loss per case', 'Rates', 'Cases', 'Health Care Cost', 'Utility loss', 'Total cost (Healthcare and utility loss)']
    resultHeading = ['Condition(s)', 'County', 'Cost per case', 'Utility loss per case', 'Rates', 'Population', 'Cases', 'Utility loss', 'Health Care Cost', 'Total cost (Healthcare and utility loss)']
    allDiseasesName: any = [];
    roiForm: FormGroup;
    showCost: boolean = false;
    showRoi: boolean = false;
    availableCounties: any = [];
    totalCostResponse: any = { "Totals": {}, "Counties": {} }
    regionList: any = [];
    ethnicityList: any = [];
    diseaseList: any = [];
    countiesList: any = [];
    ROIDATA = [...roiResultFormat];
    RESULTDATA = resultData;
    consolidateROIDATA: any[] = [];
    dummyROIResult = dummyROIResult;
    dummyUtilityCostResult = dummyUtilityCostResult
    consolidateCOSTDATA: any;
    currentIndex: number = 0;
    showError: string = '';
    ageMsg: string = '';
    genderMsg: string = '';
    diseaseMsg: string = '';
    countiesMsg: string = '';
    regionMsg: string = '';
    ethnicityMsg: string = '';
    ageLimitMsg: string = '';
    minAge:number = 18
    maxAge:number = 100
    loading: boolean = false;

    constructor(private fb: FormBuilder, private dialog: MatDialog, private calculatorService: CalculatorService, private csvExportService: CsvExportServiceService) {
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
            "Total_cost_Healthcare_and_utility_loss": "$53",
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
            "Total_cost_Healthcare_and_utility_loss": "$53",
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
            "Total_cost_Healthcare_and_utility_loss": "$53",
        },
    ]



    setActiveTab(tab: any) {
        this.activeTab = tab;
    }
    openDialog(data: any) {

        var messagetype = ''
        var selectedItems;
        var dataListtype: any[] = []
        if (data == 'ethnicity') {
            messagetype = 'ETHNICITY'
            dataListtype = [...this.ethnicityList]
        } else if (data == 'region') {
            messagetype = 'REGIONS'
            dataListtype = [...this.regionList]
        } else if (data == 'counties') {
            messagetype = 'COUNTIES'
            dataListtype = [...this.availableCounties]
        } else if (data == 'disease') {
            messagetype = 'DISEASES'
            dataListtype = [...this.diseaseList]

        }
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            maxHeight: "90vh",
            data: {
                message: messagetype,
                dataList: [...dataListtype],
                search: this.selectedSearch
            }
        });
        dialogRef.afterClosed().subscribe((selectedItems: any) => {
            if (messagetype == 'ETHNICITY') {
              
                this.selectedEthnicity = selectedItems.length === 0 ? [] : selectedItems;
                this.ethnicityList.forEach((ele: { [x: string]: boolean; id: any; }) => {
                    ele['checked'] = false
                    let index = this.selectedEthnicity.find((obj: { id: any; }) => obj.id === ele.id)
                    if (index) {
                        ele['checked'] = true
                    }
                })
            }
            else if (messagetype == 'REGIONS') {
                this.selectedRegions = selectedItems.length === 0 ? [] : selectedItems;
                this.regionList.forEach((ele: { [x: string]: boolean; id: any; }) => {
                    ele['checked'] = false
                    let index = this.selectedRegions.find((obj: { id: any; }) => obj.id === ele.id)
                    if (index) {
                        ele['checked'] = true
                    }
                })
                this.onRegionSelectionChange(this.selectedRegions)
            } else if (messagetype == 'COUNTIES') {
                this.selectedCounties = selectedItems.length === 0 ? [] : selectedItems;
                this.countiesList.forEach((ele: { [x: string]: boolean; id: any; }) => {
                    ele['checked'] = false
                    let index = this.selectedCounties.find((obj: { id: any; }) => obj.id === ele.id)
                    if (index) {
                        ele['checked'] = true
                    }
                })
                // }
            } else if (messagetype == 'DISEASES') {
                this.selectedDiseases = selectedItems.length === 0 ? [] : selectedItems;
                this.diseaseList.forEach((ele: { [x: string]: boolean; id: any; }) => {
                    ele['checked'] = false
                    let index = this.selectedDiseases.find((obj: { id: any; }) => obj.id === ele.id)
                    if (index) {
                        ele['checked'] = true
                    }
                })
            }
        });
    }
    removeItemFromArray(item: any,arrayName = ''): void {
        if (arrayName === 'REGIONS') {
            const index = this.selectedRegions.findIndex((obj: { id: any; })=>obj.id === item.id)
            if (index !== -1) {
                this.selectedRegions.splice(index, 1);
            }
            this.regionList.forEach((ele: { [x: string]: boolean; id: any; }) => {
                let index = this.selectedRegions.findIndex((obj: { id: any; }) => obj.id === ele.id)
                ele['checked'] = false
                if (index > -1) {
                    ele['checked'] = true
                }
            })
            this.onRegionSelectionChange(this.selectedRegions)
        } if (arrayName === 'ETHNICITY') {
            const index = this.selectedEthnicity.findIndex((obj: any)=>obj.id === item.id)
            if (index !== -1) {
                this.selectedEthnicity.splice(index, 1);
            }
            this.ethnicityList.forEach((ele: { [x: string]: boolean; id: any; }) => {
                let index =  this.selectedEthnicity.findIndex((obj: { id: any; }) => obj.id === ele.id)
                ele['checked'] = false
                if (index > -1) {
                    ele['checked'] = true
                }
            })
        } if (arrayName === 'COUNTIES') {
            const index = this.selectedCounties.findIndex((obj: { id: any; })=>obj.id === item.id)
            if (index !== -1) {
                this.selectedCounties.splice(index, 1);
            }
            this.countiesList.forEach((ele: { [x: string]: boolean; id: any; }) => {
                let index = this.selectedCounties.findIndex((obj: { id: any; }) => obj.id === ele.id)
                ele['checked'] = false
                if (index > -1) {
                    ele['checked'] = true
                }
            })
        } if (arrayName === 'DISEASES') {
            const index = this.selectedDiseases.findIndex((obj: { id: any; })=>obj.id === item.id)
            if (index !== -1) {
                this.selectedDiseases.splice(index, 1);
            }
            this.diseaseList.forEach((ele: { [x: string]: boolean; id: any; }) => {
                let index =this.selectedDiseases.findIndex((obj: { id: any; }) => obj.id === ele.id)
                ele['checked'] = false
                if (index > -1) {
                    ele['checked'] = true
                }
            })
        }
    }
    removeItem(event: Event, item: any, arrayName = ''): void {
        event.stopPropagation()
        this.removeItemFromArray(item, arrayName);
    }
    ngOnInit(): void {
        this.getEthnicity()
        //this.getAgegroup()
        this.getCounties()
        this.getDiseases()
        this.getRegions()
    }
    getRegions() {
        this.calculatorService.getRegions().subscribe(res => {
            this.regionList = res
            this.regionList.forEach((ele: { [x: string]: boolean; }) => {
                ele['checked'] = false
            })
        }, (err) => {
            this.regionList = regionList
            this.regionList.forEach((ele: { [x: string]: boolean; }) => {
                ele['checked'] = false
            })
        })
      
    }
    getEthnicity() {
        this.calculatorService.getEthnicity().subscribe(res => {
            this.ethnicityList = res
            this.ethnicityList.forEach((ele: { [x: string]: boolean; }) => {
                ele['checked'] = false
            })
        }, (err) => {
            this.ethnicityList = ethnicityList
            this.ethnicityList.forEach((ele: { [x: string]: boolean; }) => {
                ele['checked'] = false
            })
        })
        
       
       
       
    }
    getDiseases() {
        this.calculatorService.getDiseases().subscribe(res => {
            this.diseaseList = res
            this.diseaseList.forEach((ele: { [x: string]: boolean; }) => {
                ele['checked'] = false
            })
        }, (err) => {
            this.diseaseList = diseaseList
            this.diseaseList.forEach((ele: { [x: string]: boolean; }) => {
                ele['checked'] = false
            })
        })
    }
    getCounties() {
        this.calculatorService.getCounties().subscribe(res => {
            this.countiesList = res
            this.countiesList.forEach((ele: { [x: string]: boolean; }) => {
                ele['checked'] = false
            })
            this.availableCounties = this.countiesList
        }, (err) => {
            this.countiesList = countiesList
           
            this.countiesList.forEach((ele: { [x: string]: boolean; }) => {
                ele['checked'] = false
            })
            this.availableCounties = countiesList
        })
    }

    onRegionSelectionChange(selectedRegion: any[]) {
        let arrayOfArrays: any[] = []
        selectedRegion.forEach((ele) => {
            let selectedCounty = this.countiesList.filter((obj: { region: { id: any; }; }) => obj.region.id === ele.id)
            arrayOfArrays.push(selectedCounty)
            this.availableCounties = []
            this.availableCounties = [].concat(...arrayOfArrays);
            this.selectedCounties = []
        })
    }
    utilityCost(isCSV = false) {
        this.loading = true
        this.showRoi = false
        this.showError = ''
        this.showCost = false
        this.ageMsg = '';
        this.genderMsg = '';
         this.diseaseMsg = '';
         this.countiesMsg = '';
         this.regionMsg = '';
         this.ethnicityMsg = '';
         this.ageLimitMsg = '';
        let count = 0
        if (this.selectedCounties.length === 0) {
            this.countiesMsg = 'Counties are required';
            count++;
        }
        if (this.selectedEthnicity.length === 0) {
            this.ethnicityMsg = 'Ethnicity are required';
            count++;
        }
        if (this.selectedDiseases.length === 0) {
            this.diseaseMsg = 'Diseases are required';
            count++;
        }
        if (this.selectedRegions.length === 0) {
            this.regionMsg = 'Region is required';
            count++;
        }

       
        // this.createUtilityData(this.dummyUtilityCostResult)
        const region = this.selectedRegions.map((obj) => obj.id)
        const county = this.selectedCounties.map((obj) => obj.id)
        const ethnicity = this.selectedEthnicity.map((obj: { id: any; }) => obj.id)
        const disease = this.selectedDiseases.map((obj) => obj.id)

        const sex:any = []
        if (this.isFemaleChecked) {
            sex.push('Female')
        }
        if (this.isMaleChecked) {
            sex.push('Male')
        }
        if (!this.isFemaleChecked && !this.isMaleChecked) {
            this.genderMsg = 'Gender is required';
            count++;
        }
        if(this.startAge == 0 || this.endAge == 0){
            this.ageMsg = `Start and End age can't be 0`;
            count++;
        }
      
        if (this.endAge > this.maxAge) {
            this.ageLimitMsg = `End Age can't be greater than ${this.maxAge}`
            count++;
        }
        if (this.startAge > this.maxAge) {
            this.ageLimitMsg = `Start Age can't be greater than ${this.maxAge}`
            count++;
        }
        if (this.endAge < this.minAge) {
            this.ageLimitMsg = `End Age can't be lesser than ${this.minAge}`
            count++;
        }
        if (this.startAge < this.minAge) {
            this.ageLimitMsg = `Start Age can't be lesser than ${this.minAge}`
            count++;
        }
        if (this.endAge < this.startAge) {
            this.ageLimitMsg = `End Age should be equal or greater than ${this.startAge}`
            count++;
        }
        
        if(count > 0){
            this.loading = false;
            return 
        }
        let data = {
            "region": region.join(","),
            "county": county.join(","),
            "disease": disease.join(","),
            "ethnicity": ethnicity.join(","),
            "ageGroup": `${this.startAge}-${this.endAge}`,
            "sex": sex.join(","),
        }
        if (isCSV) {

        } else {
            this.calculatorService.utilityCost(data).subscribe(res => {
                this.loading = false;
                this.createUtilityData(res)
            }, (err) => {
                // this.createUtilityData(this.dummyUtilityCostResult)
                this.loading = false;
                this.showCost = false
                this.showError = 'No Data Found'
                this.showRoi = false
            })
        }


    }
    createUtilityData(data: any) {
        this.totalCostResponse = data
        this.showCost = true
        this.showRoi = false
        this.showError = ''
    }
    checkIsDataAvailable() {
        if (this.Object.keys(this.totalCostResponse['Totals']).length > 0) {
            return true
        }
        return false
    }
    roiCalculator() {
        this.loading = true;
        this.showRoi = false
        this.showError = ''
        this.showCost = false
        this.ageMsg = '';
        this.genderMsg = '';
         this.diseaseMsg = '';
         this.countiesMsg = '';
         this.regionMsg = '';
         this.ethnicityMsg = '';
         this.ageLimitMsg = '';
        let count = 0
        if (this.selectedCounties.length === 0) {
            this.countiesMsg = 'Counties are required';
            count++;
        }
        if (this.selectedEthnicity.length === 0) {
            this.ethnicityMsg = 'Ethnicity are required';
            count++;
        }
        if (this.selectedDiseases.length === 0) {
            this.diseaseMsg = 'Diseases are required';
            count++;
        }
        const sex:any = []
        if (this.isFemaleChecked) {
            sex.push('Female')
        }
        if (this.isMaleChecked) {
            sex.push('Male')
        }
        if (!this.isFemaleChecked && !this.isMaleChecked) {
            this.genderMsg = 'Gender is required';
            count++;
        }
        if (!this.startAge && !this.endAge) {
            this.ageMsg = 'Start and End age is required';
            count++;
        }
        if (this.startAge > this.maxAge) {
            this.ageLimitMsg = `Start Age can't be greater than ${this.maxAge}`
            count++;
        }
        if (this.endAge > this.maxAge) {
            this.ageLimitMsg = `End Age can't be greater than ${this.maxAge}`
            count++;
        }
        if (this.startAge < this.minAge) {
            this.ageLimitMsg = `Start Age can't be lesser than ${this.minAge}`
            count++;
        }
        if (this.endAge < this.minAge) {
            this.ageLimitMsg = `End Age can't be lesser than ${this.minAge}`
            count++;
        }
        if (this.endAge < this.startAge) {
            this.ageLimitMsg = `End Age should be equal or greater than ${this.startAge}`
            count++;
        }
       
        if(count > 0){
            this.loading = false;
            return 
        }
        const county = this.selectedCounties.map((obj) => obj.id)
        const countyRegion = this.countiesList.find((obj: { id: any; }) => obj.id === county[0])
        const region = [countyRegion.region.id]
        const ethnicity = this.selectedEthnicity.map((obj: { id: any; }) => obj.id)
        const disease = this.selectedDiseases.map((obj) => obj.id)

       
        let data = {
            "county": county.join(","),
            "region": region.join(","),
            "disease": disease.join(","),
            "sex": sex.join(","),
            "ethnicity": ethnicity.join(","),
            "ageLimit": `${this.startAge}-${this.endAge}`,
            "sizeOfGroup": this.roiForm.value.sizeOfTargetGroup,
            "anticipatedEffectivenessOfProgram": this.roiForm.value.anticipatedEffectivenessOfProgram,
            "anticipatedTimeForEffectivenessOfProgram": this.roiForm.value.expectedTimeframesForResults,//
            "numberOfYearsForROI": this.roiForm.value.expectedTimeframesForROI,//
            "initialProgramCost": this.roiForm.value.initialProgramCosts,
            "ongoingProgramCost": this.roiForm.value.ongoingProgramCosts,
            "operationalPeriodOfProgram": this.roiForm.value.programDuration,//
            "discountRate": this.roiForm.value.discountRate,
            "valueOfQaly": this.roiForm.value.valueOfQALY
        }

        this.calculatorService.roiCalcuator(data).subscribe(res => {
            this.loading = false;
            this.resultsData = res
            this.createData(this.resultsData['Total'])
        }, (err) => {
            this.loading = false;
            this.showRoi = false
            this.showError = 'No Data Found'
            this.showCost = false

        })
    }
    getCostData(i: number) {
        return this.consolidateCOSTDATA[i]
    }
    createData(res: any) {

        this.showRoi = true
        this.showError = ''
        this.showCost = false
        this.consolidateROIDATA = [];
        this.consolidateCOSTDATA = []
        let keys = Object.keys(res)
        for (let i = 0; i < keys.length; i++) {

            let keyName = keys[i]

            let costObj: any = {}
            costObj["county"] = res[keyName]['county'],
                costObj["costPerCaseInitial"] = res[keyName]['costPerCaseInitial'],
                costObj["costPerCaseAfterProgram"] = res[keyName]['costPerCaseAfterProgram']
            costObj["costPerCaseDiff"] = res[keyName]['costPerCaseDiff']
            costObj["utilityLossPerCaseInitial"] = res[keyName]['utilityLossPerCaseInitial']
            costObj["utilityLossPerCaseAfterProgram"] = res[keyName]['utilityLossPerCaseAfterProgram']
            costObj["utilityLossPerCaseDiff"] = res[keyName]['utilityLossPerCaseDiff']
            costObj["ratesInitial"] = res[keyName]['ratesInitial']
            costObj["ratesAfterProgram"] = res[keyName]['ratesAfterProgram']
            costObj["ratesDiff"] = res[keyName]['ratesDiff']
            costObj["populationInitial"] = res[keyName]['populationInitial']
            costObj["populationAfterProgram"] = res[keyName]['populationAfterProgram']
            costObj["populationDiff"] = res[keyName]['populationDiff']
            costObj["casesInitial"] = res[keyName]['casesInitial']
            costObj["casesAfterProgram"] = res[keyName]['casesAfterProgram']
            costObj["casesDiff"] = res[keyName]['casesDiff']
            costObj["utilityLossInitial"] = res[keyName]['utilityLossInitial']
            costObj["utilityLossAfterProgram"] = res[keyName]['utilityLossAfterProgram']
            costObj["utilityLossDiff"] = res[keyName]['utilityLossDiff']
            costObj["healthCareCostInitial"] = res[keyName]['healthCareCostInitial']
            costObj["healthCareCostAfterProgram"] = res[keyName]['healthCareCostAfterProgram']
            costObj["healthCareCostDiff"] = res[keyName]['healthCareCostDiff']
            costObj["totalCostInitial"] = res[keyName]['totalCostInitial']
            costObj["totalCostAfterProgram"] = res[keyName]['totalCostAfterProgram']
            costObj["totalCostDiff"] = res[keyName]['totalCostDiff']

            this.consolidateCOSTDATA.push(costObj)
            let roiData = [...this.ROIDATA.map(obj => ({ ...obj }))]; // Make a copy of this.ROIDATA

            roiData[0]['without_program'] = res[keyName]['totalCasesWithoutProgram'];
            roiData[0]['With_Program'] = res[keyName]['totalCasesWithProgram'];
            roiData[0]['Difference'] = res[keyName]['totalCasesDiff'];
            roiData[0]['title'] = keyName;

            roiData[1]['without_program'] = res[keyName]['totalCostWithoutQalyWithoutProgram'];
            roiData[1]['With_Program'] = res[keyName]['totalCostWithoutQalyWithProgram'];
            roiData[1]['Difference'] = res[keyName]['totalCostWithoutQalyDiff'];

            roiData[2]['without_program'] = res[keyName]['totalCostWithQalyWithoutProgram'];
            roiData[2]['With_Program'] = res[keyName]['totalCostWithQalyWithProgram'];
            roiData[2]['Difference'] = res[keyName]['totalCostWithQalyDiff'];

            roiData[3]['without_program'] = res[keyName]['totalQaLYWithoutProgram'];
            roiData[3]['With_Program'] = res[keyName]['totalQalyWithProgram'];
            roiData[3]['Difference'] = res[keyName]['totalQalyDiff'];

            roiData[4]['without_program'] = res[keyName]['investmentWithoutProgram'];
            roiData[4]['With_Program'] = res[keyName]['investmentWithProgram'];
            roiData[4]['Difference'] = res[keyName]['investmentDiff'];

            roiData[5]['without_program'] = "-";
            roiData[5]['With_Program'] = res[keyName]['roiwithoutQaly'];
            roiData[5]['Difference'] = res[keyName]['roiwithoutQaly'];

            roiData[6]['without_program'] = "-";
            roiData[6]['With_Program'] = res[keyName]['roiwithQaly'];
            roiData[6]['Difference'] = res[keyName]['roiwithQaly'];

            roiData[7]['without_program'] = "-";
            roiData[7]['With_Program'] = res[keyName]['roidiscounted'];
            roiData[7]['Difference'] = res[keyName]['roidiscounted'];

            this.consolidateROIDATA.push(roiData);

        }

    }
    getHeading(index: number) {

        return this.consolidateROIDATA[index][0]['title']
    }
    doReset() {
        window.location.reload();
    }
    resetFields() {
        this.selectedRegions = [];
        this.selectedEthnicity = []
        this.selectedDiseases = []
        this.selectedCounties = []
        this.isFemaleChecked = false;
        this.isMaleChecked = false;
        this.endAge = 18;
        this.startAge = 18;
        this.roiForm.reset();
        this.showCost = false;
        this.ethnicityList.forEach((ele: { [x: string]: boolean; }) => {
            ele['checked'] = false
        })
        this.regionList.forEach((ele: { [x: string]: boolean; }) => {
            ele['checked'] = false
        })
        this.countiesList.forEach((ele: { [x: string]: boolean; }) => {
            ele['checked'] = false
        })
        this.diseaseList.forEach((ele: { [x: string]: boolean; }) => {
            ele['checked'] = false
        })
        this.tabs = []
        this.showCost = false
        this.showRoi = false
        this.showError = ''
        this.ageMsg = '';
        this.genderMsg = '';
         this.diseaseMsg = '';
         this.countiesMsg = '';
         this.regionMsg = '';
         this.ethnicityMsg = '';
         this.ageLimitMsg = '';
    }

    onEndAgeChange() {
        this.ageLimitMsg = '';
        if (this.endAge > this.maxAge) {
            this.ageLimitMsg = `Age can't be greater than ${this.maxAge}`
            return
        } 
        if (this.endAge < this.minAge) {
            this.ageLimitMsg = `Age can't be lesser than ${this.minAge}`
            return
        }
    }
    onStartAgeChange() {
        this.ageLimitMsg = '';
        this.endAge = this.startAge
        if (this.startAge > this.maxAge) {
            this.ageLimitMsg = `Age can't be greater than ${this.maxAge}`
            return
        }
        if (this.startAge < this.minAge) {
            this.ageLimitMsg = `Age can't be lesser than ${this.minAge}`
            return
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
    
    exportToExcel(): void {
        let workbook = new Workbook();
        for (let i = 0; i < this.consolidateROIDATA.length; i++) {
            const worksheet = workbook.addWorksheet(this.consolidateROIDATA[i][0]['title']);
            worksheet.addRow(['Conditon(s)', 'County', 'Cost per case', 'Utility loss per case', 'Rates', 'Population', 'Cases', 'Utility Loss', 'Health Care Costs', 'Total Cost']);
            const getTable1 = this.getCostData(i)
            worksheet.addRow(['Initial',
                getTable1.county,
                getTable1.costPerCaseInitial,
                getTable1.utilityLossPerCaseInitial,
                getTable1.ratesInitial,
                getTable1.populationInitial,
                getTable1.casesInitial,
                getTable1.utilityLossInitial,
                getTable1.healthCareCostInitial,
                getTable1.totalCostInitial,
            ])
            worksheet.addRow(['After Program',
                getTable1.county,
                getTable1.costPerCaseAfterProgram,
                getTable1.utilityLossPerCaseAfterProgram,
                getTable1.ratesAfterProgram,
                getTable1.populationAfterProgram,
                getTable1.casesAfterProgram,
                getTable1.utilityLossAfterProgram,
                getTable1.healthCareCostAfterProgram,
                getTable1.totalCostAfterProgram,
            ])
            worksheet.addRow(['Difference',
                getTable1.county,
                getTable1.costPerCaseDiff,
                getTable1.utilityLossPerCaseDiff,
                getTable1.ratesDiff,
                getTable1.populationDiff,
                getTable1.casesDiff,
                getTable1.utilityLossDiff,
                getTable1.healthCareCostDiff,
                getTable1.totalCostDiff,
            ])

            worksheet.addRow([])
            worksheet.addRow([])
            worksheet.addRow([])

            worksheet.addRow(['', 'Without Program', 'With Program', 'Difference', 'Description'])
            for (let j = 0; j < this.consolidateROIDATA[i].length; j++) {
                worksheet.addRow([
                    this.consolidateROIDATA[i][j]['Heading'],
                    this.consolidateROIDATA[i][j]['without_program'],
                    this.consolidateROIDATA[i][j]['With_Program'],
                    this.consolidateROIDATA[i][j]['Difference'],
                    this.consolidateROIDATA[i][j]['Description'],
                ])
            }

        }
        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            fs.saveAs(blob, 'my_multi_sheet_doc.xlsx');
          });

    }
}