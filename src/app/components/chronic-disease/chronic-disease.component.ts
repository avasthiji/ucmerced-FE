import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
// import { CalculatorService } from 'src/app/services/calculator.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {ConfirmationDialog} from '../dialog/confirmation-dialog.component';

@Component({
    selector: 'app-chronic-disease',
    templateUrl: './chronic-disease.component.html',
    styleUrls: ['./chronic-disease.component.css']
})
export class ChronicDiseaseComponent implements OnInit {
    
    searchOptions = [
        { key: 1, value: 'Utility Cost' },
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
    endAge = 0
    startAge = 0
    diseaseList: any = [
        {
            "id": 1,
            "diseaseName": "Arthritis"
        },
        {
            "id": 2,
            "diseaseName": "Asthma"
        },
        {
            "id": 3,
            "diseaseName": "Coronary Heart Disease (CHD)"
        },
        {
            "id": 4,
            "diseaseName": "Congestive Heart Failure (CHF)"
        },
        {
            "id": 5,
            "diseaseName": "Depression"
        },
        {
            "id": 6,
            "diseaseName": "Diabetes"
        },
        {
            "id": 7,
            "diseaseName": "Hypertension"
        },
        {
            "id": 8,
            "diseaseName": "Stroke"
        },
        {
            "id": 9,
            "diseaseName": "Cancer"
        }
    ];
    regionList: any = [
        {
            "id": 1,
            "regionName": "BAY AREA COUNTIES"
        },
        {
            "id": 2,
            "regionName": "NORTHERN AND SIERRA COUNTIES"
        },
        {
            "id": 3,
            "regionName": "SACRAMENTO AREA COUNTIES"
        },
        {
            "id": 4,
            "regionName": "SAN JOAQUIN VALLEY COUNTIES"
        },
        {
            "id": 5,
            "regionName": "OTHER SOUTHERN COUNTIES"
        },
        {
            "id": 6,
            "regionName": "LOS ANGELES COUNTIES"
        },
        {
            "id": 7,
            "regionName": "CENTRAL COAST COUNTIES"
        }
    ]
    countiesList: any = [
        {
            "id": 1,
            "region": {
                "id": 1,
                "regionName": "BAY AREA COUNTIES"
            },
            "countyName": "Alameda"
        },
        {
            "id": 2,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Alpine"
        },
        {
            "id": 3,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Amador"
        },
        {
            "id": 4,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Butte"
        },
        {
            "id": 5,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Calaveras"
        },
        {
            "id": 6,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Colusa"
        },
        {
            "id": 7,
            "region": {
                "id": 1,
                "regionName": "BAY AREA COUNTIES"
            },
            "countyName": "Contra Costa"
        },
        {
            "id": 8,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Del Norte"
        },
        {
            "id": 9,
            "region": {
                "id": 3,
                "regionName": "SACRAMENTO AREA COUNTIES"
            },
            "countyName": "El Dorado"
        },
        {
            "id": 10,
            "region": {
                "id": 4,
                "regionName": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "countyName": "Fresno"
        },
        {
            "id": 11,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Glenn"
        },
        {
            "id": 12,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Humboldt"
        },
        {
            "id": 13,
            "region": {
                "id": 5,
                "regionName": "OTHER SOUTHERN COUNTIES"
            },
            "countyName": "Imperial"
        },
        {
            "id": 14,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Inyo"
        },
        {
            "id": 15,
            "region": {
                "id": 4,
                "regionName": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "countyName": "Kern"
        },
        {
            "id": 16,
            "region": {
                "id": 4,
                "regionName": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "countyName": "Kings"
        },
        {
            "id": 17,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Lake"
        },
        {
            "id": 18,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Lassen"
        },
        {
            "id": 19,
            "region": {
                "id": 6,
                "regionName": "LOS ANGELES COUNTIES"
            },
            "countyName": "Los Angeles"
        },
        {
            "id": 20,
            "region": {
                "id": 4,
                "regionName": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "countyName": "Madera"
        },
        {
            "id": 21,
            "region": {
                "id": 1,
                "regionName": "BAY AREA COUNTIES"
            },
            "countyName": "Marin"
        },
        {
            "id": 22,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Mariposa"
        },
        {
            "id": 23,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Mendocino"
        },
        {
            "id": 24,
            "region": {
                "id": 4,
                "regionName": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "countyName": "Merced"
        },
        {
            "id": 25,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Modoc"
        },
        {
            "id": 26,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Mono"
        },
        {
            "id": 27,
            "region": {
                "id": 7,
                "regionName": "CENTRAL COAST COUNTIES"
            },
            "countyName": "Monterey"
        },
        {
            "id": 28,
            "region": {
                "id": 1,
                "regionName": "BAY AREA COUNTIES"
            },
            "countyName": "Napa"
        },
        {
            "id": 29,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Nevada"
        },
        {
            "id": 30,
            "region": {
                "id": 5,
                "regionName": "OTHER SOUTHERN COUNTIES"
            },
            "countyName": "Orange"
        },
        {
            "id": 31,
            "region": {
                "id": 3,
                "regionName": "SACRAMENTO AREA COUNTIES"
            },
            "countyName": "Placer"
        },
        {
            "id": 32,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Plumas"
        },
        {
            "id": 33,
            "region": {
                "id": 5,
                "regionName": "OTHER SOUTHERN COUNTIES"
            },
            "countyName": "Riverside"
        },
        {
            "id": 34,
            "region": {
                "id": 3,
                "regionName": "SACRAMENTO AREA COUNTIES"
            },
            "countyName": "Sacramento"
        },
        {
            "id": 35,
            "region": {
                "id": 7,
                "regionName": "CENTRAL COAST COUNTIES"
            },
            "countyName": "San Benito"
        },
        {
            "id": 36,
            "region": {
                "id": 5,
                "regionName": "OTHER SOUTHERN COUNTIES"
            },
            "countyName": "San Bernardino"
        },
        {
            "id": 37,
            "region": {
                "id": 5,
                "regionName": "OTHER SOUTHERN COUNTIES"
            },
            "countyName": "San Diego"
        },
        {
            "id": 38,
            "region": {
                "id": 1,
                "regionName": "BAY AREA COUNTIES"
            },
            "countyName": "San Francisco"
        },
        {
            "id": 39,
            "region": {
                "id": 4,
                "regionName": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "countyName": "San Joaquin"
        },
        {
            "id": 40,
            "region": {
                "id": 7,
                "regionName": "CENTRAL COAST COUNTIES"
            },
            "countyName": "San Luis Obispo"
        },
        {
            "id": 41,
            "region": {
                "id": 1,
                "regionName": "BAY AREA COUNTIES"
            },
            "countyName": "San Mateo"
        },
        {
            "id": 42,
            "region": {
                "id": 7,
                "regionName": "CENTRAL COAST COUNTIES"
            },
            "countyName": "Santa Barbara"
        },
        {
            "id": 43,
            "region": {
                "id": 1,
                "regionName": "BAY AREA COUNTIES"
            },
            "countyName": "Santa Clara"
        },
        {
            "id": 44,
            "region": {
                "id": 7,
                "regionName": "CENTRAL COAST COUNTIES"
            },
            "countyName": "Santa Cruz"
        },
        {
            "id": 45,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Shasta"
        },
        {
            "id": 46,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Sierra"
        },
        {
            "id": 47,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Siskiyou"
        },
        {
            "id": 48,
            "region": {
                "id": 1,
                "regionName": "BAY AREA COUNTIES"
            },
            "countyName": "Solano"
        },
        {
            "id": 49,
            "region": {
                "id": 1,
                "regionName": "BAY AREA COUNTIES"
            },
            "countyName": "Sonoma"
        },
        {
            "id": 50,
            "region": {
                "id": 4,
                "regionName": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "countyName": "Stanislaus"
        },
        {
            "id": 51,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Sutter"
        },
        {
            "id": 52,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Tehama"
        },
        {
            "id": 53,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Trinity"
        },
        {
            "id": 54,
            "region": {
                "id": 4,
                "regionName": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "countyName": "Tulare"
        },
        {
            "id": 55,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Tuolomne"
        },
        {
            "id": 56,
            "region": {
                "id": 7,
                "regionName": "CENTRAL COAST COUNTIES"
            },
            "countyName": "Ventura"
        },
        {
            "id": 57,
            "region": {
                "id": 3,
                "regionName": "SACRAMENTO AREA COUNTIES"
            },
            "countyName": "Yolo"
        },
        {
            "id": 58,
            "region": {
                "id": 2,
                "regionName": "NORTHERN AND SIERRA COUNTIES"
            },
            "countyName": "Yuba"
        }
    ]
    ethnicityList: any = [
        {
            "id": 1,
            "ethnicityName": "African American"
        },
        {
            "id": 2,
            "ethnicityName": "ASIAN"
        },
        {
            "id": 3,
            "ethnicityName": "HISPANIC"
        },
        {
            "id": 4,
            "ethnicityName": "Other Races"
        },
        {
            "id": 5,
            "ethnicityName": "Non-Hispanic White"
        },
        {
            "id": 6,
            "ethnicityName": "White/Other"
        }
    ]

    diseaseList2: any = [
        {
            "id": 1,
            "name": "Arthritis"
        },
        {
            "id": 2,
            "name": "Asthma"
        },
        {
            "id": 3,
            "name": "Coronary Heart Disease (CHD)"
        },
        {
            "id": 4,
            "name": "Congestive Heart Failure (CHF)"
        },
        {
            "id": 5,
            "name": "Depression"
        },
        {
            "id": 6,
            "name": "Diabetes"
        },
        {
            "id": 7,
            "name": "Hypertension"
        },
        {
            "id": 8,
            "name": "Stroke"
        },
        {
            "id": 9,
            "name": "Cancer"
        }
    ];
    regionList2: any = [
        {
            "id": 1,
            "name": "BAY AREA COUNTIES"
        },
        {
            "id": 2,
            "name": "NORTHERN AND SIERRA COUNTIES"
        },
        {
            "id": 3,
            "name": "SACRAMENTO AREA COUNTIES"
        },
        {
            "id": 4,
            "name": "SAN JOAQUIN VALLEY COUNTIES"
        },
        {
            "id": 5,
            "name": "OTHER SOUTHERN COUNTIES"
        },
        {
            "id": 6,
            "name": "LOS ANGELES COUNTIES"
        },
        {
            "id": 7,
            "name": "CENTRAL COAST COUNTIES"
        }
    ]
    countiesList2: any = [
        {
            "id": 1,
            "region": {
                "id": 1,
                "name": "BAY AREA COUNTIES"
            },
            "name": "Alameda"
        },
        {
            "id": 2,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Alpine"
        },
        {
            "id": 3,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Amador"
        },
        {
            "id": 4,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Butte"
        },
        {
            "id": 5,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Calaveras"
        },
        {
            "id": 6,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Colusa"
        },
        {
            "id": 7,
            "region": {
                "id": 1,
                "name": "BAY AREA COUNTIES"
            },
            "name": "Contra Costa"
        },
        {
            "id": 8,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Del Norte"
        },
        {
            "id": 9,
            "region": {
                "id": 3,
                "name": "SACRAMENTO AREA COUNTIES"
            },
            "name": "El Dorado"
        },
        {
            "id": 10,
            "region": {
                "id": 4,
                "name": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "name": "Fresno"
        },
        {
            "id": 11,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Glenn"
        },
        {
            "id": 12,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Humboldt"
        },
        {
            "id": 13,
            "region": {
                "id": 5,
                "name": "OTHER SOUTHERN COUNTIES"
            },
            "name": "Imperial"
        },
        {
            "id": 14,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Inyo"
        },
        {
            "id": 15,
            "region": {
                "id": 4,
                "name": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "name": "Kern"
        },
        {
            "id": 16,
            "region": {
                "id": 4,
                "name": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "name": "Kings"
        },
        {
            "id": 17,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Lake"
        },
        {
            "id": 18,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Lassen"
        },
        {
            "id": 19,
            "region": {
                "id": 6,
                "name": "LOS ANGELES COUNTIES"
            },
            "name": "Los Angeles"
        },
        {
            "id": 20,
            "region": {
                "id": 4,
                "name": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "name": "Madera"
        },
        {
            "id": 21,
            "region": {
                "id": 1,
                "name": "BAY AREA COUNTIES"
            },
            "name": "Marin"
        },
        {
            "id": 22,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Mariposa"
        },
        {
            "id": 23,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Mendocino"
        },
        {
            "id": 24,
            "region": {
                "id": 4,
                "name": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "name": "Merced"
        },
        {
            "id": 25,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Modoc"
        },
        {
            "id": 26,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Mono"
        },
        {
            "id": 27,
            "region": {
                "id": 7,
                "name": "CENTRAL COAST COUNTIES"
            },
            "name": "Monterey"
        },
        {
            "id": 28,
            "region": {
                "id": 1,
                "name": "BAY AREA COUNTIES"
            },
            "name": "Napa"
        },
        {
            "id": 29,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Nevada"
        },
        {
            "id": 30,
            "region": {
                "id": 5,
                "name": "OTHER SOUTHERN COUNTIES"
            },
            "name": "Orange"
        },
        {
            "id": 31,
            "region": {
                "id": 3,
                "name": "SACRAMENTO AREA COUNTIES"
            },
            "name": "Placer"
        },
        {
            "id": 32,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Plumas"
        },
        {
            "id": 33,
            "region": {
                "id": 5,
                "name": "OTHER SOUTHERN COUNTIES"
            },
            "name": "Riverside"
        },
        {
            "id": 34,
            "region": {
                "id": 3,
                "name": "SACRAMENTO AREA COUNTIES"
            },
            "name": "Sacramento"
        },
        {
            "id": 35,
            "region": {
                "id": 7,
                "name": "CENTRAL COAST COUNTIES"
            },
            "name": "San Benito"
        },
        {
            "id": 36,
            "region": {
                "id": 5,
                "name": "OTHER SOUTHERN COUNTIES"
            },
            "name": "San Bernardino"
        },
        {
            "id": 37,
            "region": {
                "id": 5,
                "name": "OTHER SOUTHERN COUNTIES"
            },
            "name": "San Diego"
        },
        {
            "id": 38,
            "region": {
                "id": 1,
                "name": "BAY AREA COUNTIES"
            },
            "name": "San Francisco"
        },
        {
            "id": 39,
            "region": {
                "id": 4,
                "name": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "name": "San Joaquin"
        },
        {
            "id": 40,
            "region": {
                "id": 7,
                "name": "CENTRAL COAST COUNTIES"
            },
            "name": "San Luis Obispo"
        },
        {
            "id": 41,
            "region": {
                "id": 1,
                "name": "BAY AREA COUNTIES"
            },
            "name": "San Mateo"
        },
        {
            "id": 42,
            "region": {
                "id": 7,
                "name": "CENTRAL COAST COUNTIES"
            },
            "name": "Santa Barbara"
        },
        {
            "id": 43,
            "region": {
                "id": 1,
                "name": "BAY AREA COUNTIES"
            },
            "name": "Santa Clara"
        },
        {
            "id": 44,
            "region": {
                "id": 7,
                "name": "CENTRAL COAST COUNTIES"
            },
            "name": "Santa Cruz"
        },
        {
            "id": 45,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Shasta"
        },
        {
            "id": 46,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Sierra"
        },
        {
            "id": 47,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Siskiyou"
        },
        {
            "id": 48,
            "region": {
                "id": 1,
                "name": "BAY AREA COUNTIES"
            },
            "name": "Solano"
        },
        {
            "id": 49,
            "region": {
                "id": 1,
                "name": "BAY AREA COUNTIES"
            },
            "name": "Sonoma"
        },
        {
            "id": 50,
            "region": {
                "id": 4,
                "name": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "name": "Stanislaus"
        },
        {
            "id": 51,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Sutter"
        },
        {
            "id": 52,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Tehama"
        },
        {
            "id": 53,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Trinity"
        },
        {
            "id": 54,
            "region": {
                "id": 4,
                "name": "SAN JOAQUIN VALLEY COUNTIES"
            },
            "name": "Tulare"
        },
        {
            "id": 55,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Tuolomne"
        },
        {
            "id": 56,
            "region": {
                "id": 7,
                "name": "CENTRAL COAST COUNTIES"
            },
            "name": "Ventura"
        },
        {
            "id": 57,
            "region": {
                "id": 3,
                "name": "SACRAMENTO AREA COUNTIES"
            },
            "name": "Yolo"
        },
        {
            "id": 58,
            "region": {
                "id": 2,
                "name": "NORTHERN AND SIERRA COUNTIES"
            },
            "name": "Yuba"
        }
    ]
    ethnicityList2: any = [
        {
            "id": 1,
            "name": "African American"
        },
        {
            "id": 2,
            "name": "ASIAN"
        },
        {
            "id": 3,
            "name": "HISPANIC"
        },
        {
            "id": 4,
            "name": "Other Races"
        },
        {
            "id": 5,
            "name": "Non-Hispanic White"
        },
        {
            "id": 6,
            "name": "White/Other"
        }
    ]

    tabs: any = [];
    resultsData: any = [];
    EthnicityData: any = {};
    RegionData: any = {};
    Object = Object;
    GenderData: any = {};
    utilityCostData: any = {};
    dummyData: any = {
        "Totals": {
            "totals": [
                {
                    "costs": "5491517500",
                    "cases": "10978"
                }
            ],
            "regions": [
                {
                    "BAY AREA COUNTIES": [
                        {
                            "costs": "5491517500",
                            "cases": "10978"
                        }
                    ]
                }
            ],
            "counties": [
                {
                    "Alameda": {
                        "data": [
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2357
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2626
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2425
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2433
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2557
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2429
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2364
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2274
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2426
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2272
                            },
                            {
                                "cases": 266,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "133170500",
                                "prevalenceRate": 11.3,
                                "population": 2357
                            },
                            {
                                "cases": 297,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "148369000",
                                "prevalenceRate": 11.3,
                                "population": 2626
                            },
                            {
                                "cases": 274,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "137012500",
                                "prevalenceRate": 11.3,
                                "population": 2425
                            },
                            {
                                "cases": 275,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "137464500",
                                "prevalenceRate": 11.3,
                                "population": 2433
                            },
                            {
                                "cases": 289,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "144470500",
                                "prevalenceRate": 11.3,
                                "population": 2557
                            },
                            {
                                "cases": 274,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "137238500",
                                "prevalenceRate": 11.3,
                                "population": 2429
                            },
                            {
                                "cases": 267,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "133566000",
                                "prevalenceRate": 11.3,
                                "population": 2364
                            },
                            {
                                "cases": 257,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "128481000",
                                "prevalenceRate": 11.3,
                                "population": 2274
                            },
                            {
                                "cases": 274,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "137069000",
                                "prevalenceRate": 11.3,
                                "population": 2426
                            },
                            {
                                "cases": 257,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Alameda",
                                "costs": "128368000",
                                "prevalenceRate": 11.3,
                                "population": 2272
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2357
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2626
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2425
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2433
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2557
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2429
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2364
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2274
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2426
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Alameda",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 2272
                            }
                        ],
                        "totals": [
                            {
                                "costs": "1365209500",
                                "cases": "2730"
                            }
                        ]
                    }
                },
                {
                    "Contra Costa": {
                        "data": [
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 862
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 858
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 928
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 936
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 960
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 981
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 997
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 948
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1022
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 942
                            },
                            {
                                "cases": 97,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "48703000",
                                "prevalenceRate": 11.3,
                                "population": 862
                            },
                            {
                                "cases": 97,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "48477000",
                                "prevalenceRate": 11.3,
                                "population": 858
                            },
                            {
                                "cases": 105,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "52432000",
                                "prevalenceRate": 11.3,
                                "population": 928
                            },
                            {
                                "cases": 106,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "52884000",
                                "prevalenceRate": 11.3,
                                "population": 936
                            },
                            {
                                "cases": 108,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "54240000",
                                "prevalenceRate": 11.3,
                                "population": 960
                            },
                            {
                                "cases": 111,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "55426500",
                                "prevalenceRate": 11.3,
                                "population": 981
                            },
                            {
                                "cases": 113,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "56330500",
                                "prevalenceRate": 11.3,
                                "population": 997
                            },
                            {
                                "cases": 107,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "53562000",
                                "prevalenceRate": 11.3,
                                "population": 948
                            },
                            {
                                "cases": 115,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "57743000",
                                "prevalenceRate": 11.3,
                                "population": 1022
                            },
                            {
                                "cases": 106,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Contra Costa",
                                "costs": "53223000",
                                "prevalenceRate": 11.3,
                                "population": 942
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 862
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 858
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 928
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 936
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 960
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 981
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 997
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 948
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1022
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Contra Costa",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 942
                            }
                        ],
                        "totals": [
                            {
                                "costs": "533021000",
                                "cases": "1065"
                            }
                        ]
                    }
                },
                {
                    "Marin": {
                        "data": [
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 62
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 81
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 57
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 61
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 82
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 78
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 64
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 67
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 55
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 41
                            },
                            {
                                "cases": 7,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "3503000",
                                "prevalenceRate": 11.3,
                                "population": 62
                            },
                            {
                                "cases": 9,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "4576500",
                                "prevalenceRate": 11.3,
                                "population": 81
                            },
                            {
                                "cases": 6,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "3220500",
                                "prevalenceRate": 11.3,
                                "population": 57
                            },
                            {
                                "cases": 7,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "3446500",
                                "prevalenceRate": 11.3,
                                "population": 61
                            },
                            {
                                "cases": 9,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "4633000",
                                "prevalenceRate": 11.3,
                                "population": 82
                            },
                            {
                                "cases": 9,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "4407000",
                                "prevalenceRate": 11.3,
                                "population": 78
                            },
                            {
                                "cases": 7,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "3616000",
                                "prevalenceRate": 11.3,
                                "population": 64
                            },
                            {
                                "cases": 8,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "3785500",
                                "prevalenceRate": 11.3,
                                "population": 67
                            },
                            {
                                "cases": 6,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "3107500",
                                "prevalenceRate": 11.3,
                                "population": 55
                            },
                            {
                                "cases": 5,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Marin",
                                "costs": "2316500",
                                "prevalenceRate": 11.3,
                                "population": 41
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 62
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 81
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 57
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 61
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 82
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 78
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 64
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 67
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 55
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Marin",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 41
                            }
                        ],
                        "totals": [
                            {
                                "costs": "36612000",
                                "cases": "73"
                            }
                        ]
                    }
                },
                {
                    "San Francisco": {
                        "data": [
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 927
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 980
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 941
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 882
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1003
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 926
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 984
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 814
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1052
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 981
                            },
                            {
                                "cases": 105,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "52375500",
                                "prevalenceRate": 11.3,
                                "population": 927
                            },
                            {
                                "cases": 111,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "55370000",
                                "prevalenceRate": 11.3,
                                "population": 980
                            },
                            {
                                "cases": 106,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "53166500",
                                "prevalenceRate": 11.3,
                                "population": 941
                            },
                            {
                                "cases": 100,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "49833000",
                                "prevalenceRate": 11.3,
                                "population": 882
                            },
                            {
                                "cases": 113,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "56669500",
                                "prevalenceRate": 11.3,
                                "population": 1003
                            },
                            {
                                "cases": 105,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "52319000",
                                "prevalenceRate": 11.3,
                                "population": 926
                            },
                            {
                                "cases": 111,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "55596000",
                                "prevalenceRate": 11.3,
                                "population": 984
                            },
                            {
                                "cases": 92,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "45991000",
                                "prevalenceRate": 11.3,
                                "population": 814
                            },
                            {
                                "cases": 119,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "59438000",
                                "prevalenceRate": 11.3,
                                "population": 1052
                            },
                            {
                                "cases": 111,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Francisco",
                                "costs": "55426500",
                                "prevalenceRate": 11.3,
                                "population": 981
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 927
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 980
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 941
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 882
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1003
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 926
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 984
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 814
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1052
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Francisco",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 981
                            }
                        ],
                        "totals": [
                            {
                                "costs": "536185000",
                                "cases": "1073"
                            }
                        ]
                    }
                },
                {
                    "San Mateo": {
                        "data": [
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1016
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1071
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 996
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 981
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1024
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 951
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 902
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 920
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 960
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 903
                            },
                            {
                                "cases": 115,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "57404000",
                                "prevalenceRate": 11.3,
                                "population": 1016
                            },
                            {
                                "cases": 121,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "60511500",
                                "prevalenceRate": 11.3,
                                "population": 1071
                            },
                            {
                                "cases": 113,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "56274000",
                                "prevalenceRate": 11.3,
                                "population": 996
                            },
                            {
                                "cases": 111,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "55426500",
                                "prevalenceRate": 11.3,
                                "population": 981
                            },
                            {
                                "cases": 116,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "57856000",
                                "prevalenceRate": 11.3,
                                "population": 1024
                            },
                            {
                                "cases": 107,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "53731500",
                                "prevalenceRate": 11.3,
                                "population": 951
                            },
                            {
                                "cases": 102,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "50963000",
                                "prevalenceRate": 11.3,
                                "population": 902
                            },
                            {
                                "cases": 104,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "51980000",
                                "prevalenceRate": 11.3,
                                "population": 920
                            },
                            {
                                "cases": 108,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "54240000",
                                "prevalenceRate": 11.3,
                                "population": 960
                            },
                            {
                                "cases": 102,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "San Mateo",
                                "costs": "51019500",
                                "prevalenceRate": 11.3,
                                "population": 903
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1016
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1071
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 996
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 981
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 1024
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 951
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 902
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 920
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 960
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "San Mateo",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 903
                            }
                        ],
                        "totals": [
                            {
                                "costs": "549406000",
                                "cases": "1099"
                            }
                        ]
                    }
                },
                {
                    "Santa Clara": {
                        "data": [
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4048
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4153
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4216
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3942
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4109
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4154
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3886
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3621
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3871
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3593
                            },
                            {
                                "cases": 457,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "228712000",
                                "prevalenceRate": 11.3,
                                "population": 4048
                            },
                            {
                                "cases": 469,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "234644500",
                                "prevalenceRate": 11.3,
                                "population": 4153
                            },
                            {
                                "cases": 476,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "238204000",
                                "prevalenceRate": 11.3,
                                "population": 4216
                            },
                            {
                                "cases": 445,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "222723000",
                                "prevalenceRate": 11.3,
                                "population": 3942
                            },
                            {
                                "cases": 464,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "232158500",
                                "prevalenceRate": 11.3,
                                "population": 4109
                            },
                            {
                                "cases": 469,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "234701000",
                                "prevalenceRate": 11.3,
                                "population": 4154
                            },
                            {
                                "cases": 439,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "219559000",
                                "prevalenceRate": 11.3,
                                "population": 3886
                            },
                            {
                                "cases": 409,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "204586500",
                                "prevalenceRate": 11.3,
                                "population": 3621
                            },
                            {
                                "cases": 437,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "218711500",
                                "prevalenceRate": 11.3,
                                "population": 3871
                            },
                            {
                                "cases": 406,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Santa Clara",
                                "costs": "203004500",
                                "prevalenceRate": 11.3,
                                "population": 3593
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4048
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4153
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4216
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3942
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4109
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 4154
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3886
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3621
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3871
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Santa Clara",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 3593
                            }
                        ],
                        "totals": [
                            {
                                "costs": "2237004500",
                                "cases": "4471"
                            }
                        ]
                    }
                },
                {
                    "Solano": {
                        "data": [
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 311
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 314
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 309
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 296
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 304
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 331
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 332
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 334
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 341
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 346
                            },
                            {
                                "cases": 35,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "17571500",
                                "prevalenceRate": 11.3,
                                "population": 311
                            },
                            {
                                "cases": 35,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "17741000",
                                "prevalenceRate": 11.3,
                                "population": 314
                            },
                            {
                                "cases": 35,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "17458500",
                                "prevalenceRate": 11.3,
                                "population": 309
                            },
                            {
                                "cases": 33,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "16724000",
                                "prevalenceRate": 11.3,
                                "population": 296
                            },
                            {
                                "cases": 34,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "17176000",
                                "prevalenceRate": 11.3,
                                "population": 304
                            },
                            {
                                "cases": 37,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "18701500",
                                "prevalenceRate": 11.3,
                                "population": 331
                            },
                            {
                                "cases": 38,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "18758000",
                                "prevalenceRate": 11.3,
                                "population": 332
                            },
                            {
                                "cases": 38,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "18871000",
                                "prevalenceRate": 11.3,
                                "population": 334
                            },
                            {
                                "cases": 39,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "19266500",
                                "prevalenceRate": 11.3,
                                "population": 341
                            },
                            {
                                "cases": 39,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Solano",
                                "costs": "19549000",
                                "prevalenceRate": 11.3,
                                "population": 346
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 311
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 314
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 309
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 296
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 304
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 331
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 332
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 334
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 341
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Solano",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 346
                            }
                        ],
                        "totals": [
                            {
                                "costs": "181817000",
                                "cases": "363"
                            }
                        ]
                    }
                },
                {
                    "Sonoma": {
                        "data": [
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 80
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 81
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 93
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 92
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 97
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 109
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 80
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 94
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 99
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Arthritis",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 100
                            },
                            {
                                "cases": 9,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "4520000",
                                "prevalenceRate": 11.3,
                                "population": 80
                            },
                            {
                                "cases": 9,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "4576500",
                                "prevalenceRate": 11.3,
                                "population": 81
                            },
                            {
                                "cases": 11,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "5254500",
                                "prevalenceRate": 11.3,
                                "population": 93
                            },
                            {
                                "cases": 10,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "5198000",
                                "prevalenceRate": 11.3,
                                "population": 92
                            },
                            {
                                "cases": 11,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "5480500",
                                "prevalenceRate": 11.3,
                                "population": 97
                            },
                            {
                                "cases": 12,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "6158500",
                                "prevalenceRate": 11.3,
                                "population": 109
                            },
                            {
                                "cases": 9,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "4520000",
                                "prevalenceRate": 11.3,
                                "population": 80
                            },
                            {
                                "cases": 11,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "5311000",
                                "prevalenceRate": 11.3,
                                "population": 94
                            },
                            {
                                "cases": 11,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "5593500",
                                "prevalenceRate": 11.3,
                                "population": 99
                            },
                            {
                                "cases": 11,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Asthma",
                                "countyName": "Sonoma",
                                "costs": "5650000",
                                "prevalenceRate": 11.3,
                                "population": 100
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 1,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 80
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 2,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 81
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 3,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 93
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 4,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 92
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 5,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 97
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 6,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 109
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 7,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 80
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 8,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 94
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 9,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 99
                            },
                            {
                                "cases": 0,
                                "ethnicity": "ASIAN",
                                "groupName": 10,
                                "sex": "Male",
                                "regionName": "BAY AREA COUNTIES",
                                "diseaseName": "Coronary Heart Disease (CHD)",
                                "countyName": "Sonoma",
                                "costs": "0",
                                "prevalenceRate": 0.0,
                                "population": 100
                            }
                        ],
                        "totals": [
                            {
                                "costs": "52262500",
                                "cases": "104"
                            }
                        ]
                    }
                }
            ]
        },
        "diseases": [
            {
                "name": "Arthritis",
                "totals": [
                    {
                        "costs": "0",
                        "cases": "0"
                    }
                ],
                "regions": [
                    {
                        "BAY AREA COUNTIES": [
                            {
                                "costs": "0",
                                "cases": "0"
                            }
                        ]
                    }
                ],
                "counties": [
                    {
                        "Alameda": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2357
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2626
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2425
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2433
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2557
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2429
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2364
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2274
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2426
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2272
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Contra Costa": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 862
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 858
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 928
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 936
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 960
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 981
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 997
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 948
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1022
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 942
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Marin": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 62
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 81
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 57
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 61
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 82
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 78
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 64
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 67
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 55
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 41
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "San Francisco": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 927
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 980
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 941
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 882
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1003
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 926
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 984
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 814
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1052
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 981
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "San Mateo": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1016
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1071
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 996
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 981
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1024
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 951
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 902
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 920
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 960
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 903
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Santa Clara": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4048
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4153
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4216
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3942
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4109
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4154
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3886
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3621
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3871
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3593
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Solano": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 311
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 314
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 309
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 296
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 304
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 331
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 332
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 334
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 341
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 346
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Sonoma": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 80
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 81
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 93
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 92
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 97
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 109
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 80
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 94
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 99
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Arthritis",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 100
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                "name": "Asthma",
                "totals": [
                    {
                        "costs": "5491517500",
                        "cases": "10978"
                    }
                ],
                "regions": [
                    {
                        "BAY AREA COUNTIES": [
                            {
                                "costs": "5491517500",
                                "cases": "10978"
                            }
                        ]
                    }
                ],
                "counties": [
                    {
                        "Alameda": {
                            "data": [
                                {
                                    "cases": 266,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "133170500",
                                    "prevalenceRate": 11.3,
                                    "population": 2357
                                },
                                {
                                    "cases": 297,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "148369000",
                                    "prevalenceRate": 11.3,
                                    "population": 2626
                                },
                                {
                                    "cases": 274,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "137012500",
                                    "prevalenceRate": 11.3,
                                    "population": 2425
                                },
                                {
                                    "cases": 275,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "137464500",
                                    "prevalenceRate": 11.3,
                                    "population": 2433
                                },
                                {
                                    "cases": 289,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "144470500",
                                    "prevalenceRate": 11.3,
                                    "population": 2557
                                },
                                {
                                    "cases": 274,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "137238500",
                                    "prevalenceRate": 11.3,
                                    "population": 2429
                                },
                                {
                                    "cases": 267,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "133566000",
                                    "prevalenceRate": 11.3,
                                    "population": 2364
                                },
                                {
                                    "cases": 257,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "128481000",
                                    "prevalenceRate": 11.3,
                                    "population": 2274
                                },
                                {
                                    "cases": 274,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "137069000",
                                    "prevalenceRate": 11.3,
                                    "population": 2426
                                },
                                {
                                    "cases": 257,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Alameda",
                                    "costs": "128368000",
                                    "prevalenceRate": 11.3,
                                    "population": 2272
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "1365209500",
                                    "cases": "2730"
                                }
                            ]
                        }
                    },
                    {
                        "Contra Costa": {
                            "data": [
                                {
                                    "cases": 97,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "48703000",
                                    "prevalenceRate": 11.3,
                                    "population": 862
                                },
                                {
                                    "cases": 97,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "48477000",
                                    "prevalenceRate": 11.3,
                                    "population": 858
                                },
                                {
                                    "cases": 105,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "52432000",
                                    "prevalenceRate": 11.3,
                                    "population": 928
                                },
                                {
                                    "cases": 106,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "52884000",
                                    "prevalenceRate": 11.3,
                                    "population": 936
                                },
                                {
                                    "cases": 108,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "54240000",
                                    "prevalenceRate": 11.3,
                                    "population": 960
                                },
                                {
                                    "cases": 111,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "55426500",
                                    "prevalenceRate": 11.3,
                                    "population": 981
                                },
                                {
                                    "cases": 113,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "56330500",
                                    "prevalenceRate": 11.3,
                                    "population": 997
                                },
                                {
                                    "cases": 107,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "53562000",
                                    "prevalenceRate": 11.3,
                                    "population": 948
                                },
                                {
                                    "cases": 115,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "57743000",
                                    "prevalenceRate": 11.3,
                                    "population": 1022
                                },
                                {
                                    "cases": 106,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Contra Costa",
                                    "costs": "53223000",
                                    "prevalenceRate": 11.3,
                                    "population": 942
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "533021000",
                                    "cases": "1065"
                                }
                            ]
                        }
                    },
                    {
                        "Marin": {
                            "data": [
                                {
                                    "cases": 7,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "3503000",
                                    "prevalenceRate": 11.3,
                                    "population": 62
                                },
                                {
                                    "cases": 9,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "4576500",
                                    "prevalenceRate": 11.3,
                                    "population": 81
                                },
                                {
                                    "cases": 6,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "3220500",
                                    "prevalenceRate": 11.3,
                                    "population": 57
                                },
                                {
                                    "cases": 7,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "3446500",
                                    "prevalenceRate": 11.3,
                                    "population": 61
                                },
                                {
                                    "cases": 9,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "4633000",
                                    "prevalenceRate": 11.3,
                                    "population": 82
                                },
                                {
                                    "cases": 9,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "4407000",
                                    "prevalenceRate": 11.3,
                                    "population": 78
                                },
                                {
                                    "cases": 7,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "3616000",
                                    "prevalenceRate": 11.3,
                                    "population": 64
                                },
                                {
                                    "cases": 8,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "3785500",
                                    "prevalenceRate": 11.3,
                                    "population": 67
                                },
                                {
                                    "cases": 6,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "3107500",
                                    "prevalenceRate": 11.3,
                                    "population": 55
                                },
                                {
                                    "cases": 5,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Marin",
                                    "costs": "2316500",
                                    "prevalenceRate": 11.3,
                                    "population": 41
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "36612000",
                                    "cases": "73"
                                }
                            ]
                        }
                    },
                    {
                        "San Francisco": {
                            "data": [
                                {
                                    "cases": 105,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "52375500",
                                    "prevalenceRate": 11.3,
                                    "population": 927
                                },
                                {
                                    "cases": 111,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "55370000",
                                    "prevalenceRate": 11.3,
                                    "population": 980
                                },
                                {
                                    "cases": 106,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "53166500",
                                    "prevalenceRate": 11.3,
                                    "population": 941
                                },
                                {
                                    "cases": 100,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "49833000",
                                    "prevalenceRate": 11.3,
                                    "population": 882
                                },
                                {
                                    "cases": 113,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "56669500",
                                    "prevalenceRate": 11.3,
                                    "population": 1003
                                },
                                {
                                    "cases": 105,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "52319000",
                                    "prevalenceRate": 11.3,
                                    "population": 926
                                },
                                {
                                    "cases": 111,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "55596000",
                                    "prevalenceRate": 11.3,
                                    "population": 984
                                },
                                {
                                    "cases": 92,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "45991000",
                                    "prevalenceRate": 11.3,
                                    "population": 814
                                },
                                {
                                    "cases": 119,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "59438000",
                                    "prevalenceRate": 11.3,
                                    "population": 1052
                                },
                                {
                                    "cases": 111,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Francisco",
                                    "costs": "55426500",
                                    "prevalenceRate": 11.3,
                                    "population": 981
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "536185000",
                                    "cases": "1073"
                                }
                            ]
                        }
                    },
                    {
                        "San Mateo": {
                            "data": [
                                {
                                    "cases": 115,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "57404000",
                                    "prevalenceRate": 11.3,
                                    "population": 1016
                                },
                                {
                                    "cases": 121,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "60511500",
                                    "prevalenceRate": 11.3,
                                    "population": 1071
                                },
                                {
                                    "cases": 113,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "56274000",
                                    "prevalenceRate": 11.3,
                                    "population": 996
                                },
                                {
                                    "cases": 111,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "55426500",
                                    "prevalenceRate": 11.3,
                                    "population": 981
                                },
                                {
                                    "cases": 116,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "57856000",
                                    "prevalenceRate": 11.3,
                                    "population": 1024
                                },
                                {
                                    "cases": 107,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "53731500",
                                    "prevalenceRate": 11.3,
                                    "population": 951
                                },
                                {
                                    "cases": 102,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "50963000",
                                    "prevalenceRate": 11.3,
                                    "population": 902
                                },
                                {
                                    "cases": 104,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "51980000",
                                    "prevalenceRate": 11.3,
                                    "population": 920
                                },
                                {
                                    "cases": 108,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "54240000",
                                    "prevalenceRate": 11.3,
                                    "population": 960
                                },
                                {
                                    "cases": 102,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "San Mateo",
                                    "costs": "51019500",
                                    "prevalenceRate": 11.3,
                                    "population": 903
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "549406000",
                                    "cases": "1099"
                                }
                            ]
                        }
                    },
                    {
                        "Santa Clara": {
                            "data": [
                                {
                                    "cases": 457,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "228712000",
                                    "prevalenceRate": 11.3,
                                    "population": 4048
                                },
                                {
                                    "cases": 469,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "234644500",
                                    "prevalenceRate": 11.3,
                                    "population": 4153
                                },
                                {
                                    "cases": 476,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "238204000",
                                    "prevalenceRate": 11.3,
                                    "population": 4216
                                },
                                {
                                    "cases": 445,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "222723000",
                                    "prevalenceRate": 11.3,
                                    "population": 3942
                                },
                                {
                                    "cases": 464,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "232158500",
                                    "prevalenceRate": 11.3,
                                    "population": 4109
                                },
                                {
                                    "cases": 469,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "234701000",
                                    "prevalenceRate": 11.3,
                                    "population": 4154
                                },
                                {
                                    "cases": 439,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "219559000",
                                    "prevalenceRate": 11.3,
                                    "population": 3886
                                },
                                {
                                    "cases": 409,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "204586500",
                                    "prevalenceRate": 11.3,
                                    "population": 3621
                                },
                                {
                                    "cases": 437,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "218711500",
                                    "prevalenceRate": 11.3,
                                    "population": 3871
                                },
                                {
                                    "cases": 406,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Santa Clara",
                                    "costs": "203004500",
                                    "prevalenceRate": 11.3,
                                    "population": 3593
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "2237004500",
                                    "cases": "4471"
                                }
                            ]
                        }
                    },
                    {
                        "Solano": {
                            "data": [
                                {
                                    "cases": 35,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "17571500",
                                    "prevalenceRate": 11.3,
                                    "population": 311
                                },
                                {
                                    "cases": 35,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "17741000",
                                    "prevalenceRate": 11.3,
                                    "population": 314
                                },
                                {
                                    "cases": 35,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "17458500",
                                    "prevalenceRate": 11.3,
                                    "population": 309
                                },
                                {
                                    "cases": 33,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "16724000",
                                    "prevalenceRate": 11.3,
                                    "population": 296
                                },
                                {
                                    "cases": 34,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "17176000",
                                    "prevalenceRate": 11.3,
                                    "population": 304
                                },
                                {
                                    "cases": 37,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "18701500",
                                    "prevalenceRate": 11.3,
                                    "population": 331
                                },
                                {
                                    "cases": 38,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "18758000",
                                    "prevalenceRate": 11.3,
                                    "population": 332
                                },
                                {
                                    "cases": 38,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "18871000",
                                    "prevalenceRate": 11.3,
                                    "population": 334
                                },
                                {
                                    "cases": 39,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "19266500",
                                    "prevalenceRate": 11.3,
                                    "population": 341
                                },
                                {
                                    "cases": 39,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Solano",
                                    "costs": "19549000",
                                    "prevalenceRate": 11.3,
                                    "population": 346
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "181817000",
                                    "cases": "363"
                                }
                            ]
                        }
                    },
                    {
                        "Sonoma": {
                            "data": [
                                {
                                    "cases": 9,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "4520000",
                                    "prevalenceRate": 11.3,
                                    "population": 80
                                },
                                {
                                    "cases": 9,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "4576500",
                                    "prevalenceRate": 11.3,
                                    "population": 81
                                },
                                {
                                    "cases": 11,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "5254500",
                                    "prevalenceRate": 11.3,
                                    "population": 93
                                },
                                {
                                    "cases": 10,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "5198000",
                                    "prevalenceRate": 11.3,
                                    "population": 92
                                },
                                {
                                    "cases": 11,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "5480500",
                                    "prevalenceRate": 11.3,
                                    "population": 97
                                },
                                {
                                    "cases": 12,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "6158500",
                                    "prevalenceRate": 11.3,
                                    "population": 109
                                },
                                {
                                    "cases": 9,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "4520000",
                                    "prevalenceRate": 11.3,
                                    "population": 80
                                },
                                {
                                    "cases": 11,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "5311000",
                                    "prevalenceRate": 11.3,
                                    "population": 94
                                },
                                {
                                    "cases": 11,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "5593500",
                                    "prevalenceRate": 11.3,
                                    "population": 99
                                },
                                {
                                    "cases": 11,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Asthma",
                                    "countyName": "Sonoma",
                                    "costs": "5650000",
                                    "prevalenceRate": 11.3,
                                    "population": 100
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "52262500",
                                    "cases": "104"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                "name": "Coronary Heart Disease (CHD)",
                "totals": [
                    {
                        "costs": "0",
                        "cases": "0"
                    }
                ],
                "regions": [
                    {
                        "BAY AREA COUNTIES": [
                            {
                                "costs": "0",
                                "cases": "0"
                            }
                        ]
                    }
                ],
                "counties": [
                    {
                        "Alameda": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2357
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2626
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2425
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2433
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2557
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2429
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2364
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2274
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2426
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Alameda",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 2272
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Contra Costa": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 862
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 858
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 928
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 936
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 960
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 981
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 997
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 948
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1022
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Contra Costa",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 942
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Marin": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 62
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 81
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 57
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 61
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 82
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 78
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 64
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 67
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 55
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Marin",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 41
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "San Francisco": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 927
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 980
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 941
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 882
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1003
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 926
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 984
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 814
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1052
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Francisco",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 981
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "San Mateo": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1016
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1071
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 996
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 981
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 1024
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 951
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 902
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 920
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 960
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "San Mateo",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 903
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Santa Clara": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4048
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4153
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4216
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3942
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4109
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 4154
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3886
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3621
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3871
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Santa Clara",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 3593
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Solano": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 311
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 314
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 309
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 296
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 304
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 331
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 332
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 334
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 341
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Solano",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 346
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    },
                    {
                        "Sonoma": {
                            "data": [
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 1,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 80
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 2,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 81
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 3,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 93
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 4,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 92
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 5,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 97
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 6,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 109
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 7,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 80
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 8,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 94
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 9,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 99
                                },
                                {
                                    "cases": 0,
                                    "ethnicity": "ASIAN",
                                    "groupName": 10,
                                    "sex": "Male",
                                    "regionName": "BAY AREA COUNTIES",
                                    "diseaseName": "Coronary Heart Disease (CHD)",
                                    "countyName": "Sonoma",
                                    "costs": "0",
                                    "prevalenceRate": 0.0,
                                    "population": 100
                                }
                            ],
                            "totals": [
                                {
                                    "costs": "0",
                                    "cases": "0"
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }
    allDiseasesName: any = [];
    roiForm: FormGroup;
    constructor(private fb: FormBuilder,private dialog: MatDialog) {
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
     setActiveTab(tab:any) {
        console.log(tab)
        this.activeTab = tab;
      }
     openDialog(data:any) {
       
        var messagetype = ''
        var dataListtype = this.ethnicityList2
        if(data == 'ethnicity'){
            messagetype = 'ETHNICITY'
            dataListtype = this.ethnicityList2
        }else if(data == 'region'){
            messagetype = 'REGIONS'
            dataListtype = this.regionList2
        }else if(data == 'counties'){
            messagetype = 'COUNTIES'
            dataListtype = this.countiesList2
        }else if(data == 'disease'){
            messagetype = 'DISEASES'
            dataListtype = this.diseaseList2
        }
        const dialogRef = this.dialog.open(ConfirmationDialog,{
          data:{
            message: messagetype,
            dataList:dataListtype,
          }
        });
        dialogRef.afterClosed().subscribe((selectedItems: any) => {
           if(  messagetype = 'ETHNICITY'){
            this.selectedEthnicity = selectedItems;
           }
           else if(messagetype = 'REGIONS'){
            
            this.selectedRegions = selectedItems
        }else if( messagetype = 'COUNTIES'){
           
            dataListtype = this.countiesList2
        }else if(messagetype = 'DISEASES'){
            
            this.selectedDiseases = selectedItems
        }
              
        });
    }

    ngOnInit(): void {
    }

    
    // Inside your component class
    onRegionSelectionChange(event: MatSelectChange) {
        // Handle the selection change event here
        console.log('Selected options:', event.value);
        const selectedCounty = this.countiesList.filter((county: { region: { id: any; }; }) => event.value.includes(county.region.id));
        this.selectedCounties = selectedCounty.map((obj: { id: any; }) => obj.id)
        // You can access the selected value(s) using event.value
    }
    utilityCost() {
        // let data = "region=1,2&county=1,7,21,28,38,41,43,48,49&disease=1&ethnicity=2&ageGroup=1-10&sex=Male"
        // this.calculatorService.utilityCost(data).subscribe(res=>{
        //     console.log(res)
        //     //this.createUtilityData(res)
        //     this.createUtilityData(this.dummyData)
        // })
        this.createUtilityData(this.dummyData)
    }
    createUtilityData(data: {
        diseases: [],
        Totals: {}
    }) {
        this.tabs = Object.keys(data);
        this.utilityCostData = data
        this.allDiseasesName = data['diseases'].map((obj: { name: any; }) => obj.name)
    }
    roiCalcuator() {
        console.log(this.selectedCounties)
        let data = {
            "countyName": this.selectedCounties.join(","),
            "regionName": this.selectedRegions.join(","),
            "diseaseName": this.selectedDiseases.join(","),
            "sex": "Female,Male",
            "ethnicity": this.selectedCounties.join(","),
            "ageLimit": `${this.startAge} - ${this.endAge}`,



            // "InvestmentPerPerson": initialProgramCosts,
            // "unDiscounted": true,
            // "numberOfFollowUpYears": expectedTimeframesForResults,
            // "ReductionInRateWithProgram": 5.0,
            // "ReductionInRateAfterYearsWithProgram": expectedTimeframesForROI,
            // "discountedfactor": discountRate,
            "percentIncreateInCasePerYear": 10.0,
            "sizeOfGroup": {
                "1": 50,
                "2": 100,
                "3": 150,
                "4": 200,
                "5": 250,
                "6": 300,
                "7": 350,
                "8": 400,
                "9": 450,
                "10": 500
            }
        }

        // this.calculatorService.roiCalcuator(data).subscribe(res => {
        //     console.log(res)
        //     this.resultsData = res
        //     this.createData(this.resultsData)
        // })
    }
    createData(res: {
        Ethnicity: {},
        Region: {},
        Gender: {},
        Total: {}
    }) {
        this.tabs = Object.keys(res);
        this.EthnicityData = res['Ethnicity'];
        this.RegionData = res['Region'];
        this.GenderData = res['Gender'];
        //this.EthnicityData = res['Ethnicity'];
        console.log(this.tabs)
    }
    tabChanged(event: any): void {
        // You can perform actions based on tab change if needed
        console.log('Tab changed:', event.tab.textLabel);
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
}
