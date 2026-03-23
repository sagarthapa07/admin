import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-counties',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule],
  templateUrl: './counties.html',
  styleUrl: './counties.scss',
})
export class CountiesComponent implements OnInit {
  showPasteModal = false;
  pasteText = '';

  constructor(private router: Router) {}

  readonly multiSelectSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true,
    enableCheckAll: false,
  };

  // Use for Counties SElection
  countieSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  grantMode: 'single' | 'multiple' | 'all' = 'single';
  selectedStates: any[] = [];

  activeStatesForCounties: string | null = null;

  singleFullStateMode = false;
  statesWithSelectedCounties: string[] = [];
  selectedState: string[] = [];
  selectedCounty: string[] = [];

  countiesKeyDropDowns: any = {
    states: {
      label: 'Select States',
      data: [],
      selected: [],
    },
  };

  // MULTIPLE MODE STATE STORAGE
  multipleStatesDropdown = {
    data: [],
    selected: [],
  };

  multipleSelectedStates: string[] = [];
  multipleSelectedCounties: Record<string, string[]> = {};
  multipleActiveState: string | null = null;
  multipleFullStateMode = false;

  ngOnInit(): void {
    // USe For Counties Selection
    this.countiesKeyDropDowns.states.data = [
      { item_id: 1, item_text: 'Alabama' },
      { item_id: 2, item_text: 'Alaska' },
      { item_id: 3, item_text: 'Arizona' },
      { item_id: 4, item_text: 'Arkansas' },
      { item_id: 5, item_text: 'California' },
      { item_id: 6, item_text: 'Colorado' },
      { item_id: 7, item_text: 'Connecticut' },
      { item_id: 8, item_text: 'Delaware' },
      { item_id: 9, item_text: 'Florida' },
      { item_id: 10, item_text: 'Georgia' },
      { item_id: 11, item_text: 'Hawaii' },
      { item_id: 12, item_text: 'Idaho' },
      { item_id: 13, item_text: 'Illinois' },
      { item_id: 14, item_text: 'Indiana' },
      { item_id: 15, item_text: 'Iowa' },
      { item_id: 16, item_text: 'Kansas' },
      { item_id: 17, item_text: 'Kentucky' },
      { item_id: 18, item_text: 'Louisiana' },
      { item_id: 19, item_text: 'Maine' },
      { item_id: 20, item_text: 'Maryland' },
      { item_id: 21, item_text: 'Massachusetts' },
      { item_id: 22, item_text: 'Michigan' },
      { item_id: 23, item_text: 'Minnesota' },
      { item_id: 24, item_text: 'Mississippi' },
      { item_id: 25, item_text: 'Missouri' },
      { item_id: 26, item_text: 'Montana' },
      { item_id: 27, item_text: 'Nebraska' },
      { item_id: 28, item_text: 'Nevada' },
      { item_id: 29, item_text: 'New Hampshire' },
      { item_id: 30, item_text: 'New Jersey' },
      { item_id: 31, item_text: 'New Mexico' },
      { item_id: 32, item_text: 'New York' },
      { item_id: 33, item_text: 'North Carolina' },
      { item_id: 34, item_text: 'North Dakota' },
      { item_id: 35, item_text: 'Ohio' },
      { item_id: 36, item_text: 'Oklahoma' },
      { item_id: 37, item_text: 'Oregon' },
      { item_id: 38, item_text: 'Pennsylvania' },
      { item_id: 39, item_text: 'Rhode Island' },
      { item_id: 40, item_text: 'South Carolina' },
      { item_id: 41, item_text: 'South Dakota' },
      { item_id: 42, item_text: 'Tennessee' },
      { item_id: 43, item_text: 'Texas' },
      { item_id: 44, item_text: 'Utah' },
      { item_id: 45, item_text: 'Vermont' },
      { item_id: 46, item_text: 'Virginia' },
      { item_id: 47, item_text: 'Washington' },
      { item_id: 48, item_text: 'West Virginia' },
      { item_id: 49, item_text: 'Wisconsin' },
      { item_id: 50, item_text: 'Wyoming' },
    ];
    this.multipleStatesDropdown.data = this.countiesKeyDropDowns.states.data;
  }

  goToFocusGroup() {
    this.router.navigate(['/focus-areas']);
  }

  goToSeo() {
    this.router.navigate(['/calendar-details']);
  }

  // Paste Here walaa Popup

  openPasteModal() {
    this.pasteText = '';
    this.showPasteModal = true;
  }

  closePasteModal() {
    this.showPasteModal = false;
  }

  // Select Counties k liye code start

  setGrantMode(mode: 'single' | 'multiple' | 'all') {
    this.grantMode = mode;

    // Reset previous

    this.selectedSubCounties = {};
    this.multipleSelectedStates = [];
    this.multipleSelectedCounties = {};
    this.countiesKeyDropDowns.states.selected = [];
    this.multipleStatesDropdown.selected = [];

    // =====  ALL MODE LOGIC ======

    if (mode === 'all') {
      const allStates = Object.keys(this.countiySubCountyMap);

      // Set Multiple States
      this.multipleSelectedStates = [...allStates];

      // Select All Counties for Every State
      allStates.forEach((state) => {
        this.multipleSelectedCounties[state] = [...this.countiySubCountyMap[state]];
      });

      // Update Dropdown
      this.multipleStatesDropdown.selected = this.multipleStatesDropdown.data.filter((item: any) =>
        allStates.includes(item.item_text),
      );
    }
  }
  countiySubCountyMap: Record<string, string[]> = {
    Alabama: [
      'Autauga',
      'Baldwin',
      'Barbour',
      'Bibb',
      'Blount',
      'Bullock',
      'Butler',
      'Calhoun',
      'Chambers',
      'Cherokee',
      'Chilton',
      'Choctaw',
      'Clarke',
      'Clay',
      'Cleburne',
    ],

    Alaska: [
      'Aleutians East Borough',
      'Anchorage Municipality',
      'Bristol Bay Borough',
      'Denali Borough',
      'Fairbanks North Star Borough',
      'Haines Borough',
      'Juneau City and Borough',
      'Kenai Peninsula Borough',
      'Ketchikan Gateway Borough',
      'Kodiak Island Borough',
      'Lake and Peninsula Borough',
      'Matanuska-Susitna Borough',
      'Nome Census Area',
      'North Slope Borough',
      'Sitka City and Borough',
    ],

    Arizona: [
      'Apache',
      'Cochise',
      'Coconino',
      'Gila',
      'Graham',
      'Greenlee',
      'La Paz',
      'Maricopa',
      'Mohave',
      'Navajo',
      'Pima',
      'Pinal',
      'Santa Cruz',
      'Yavapai',
      'Yuma',
    ],

    Arkansas: [
      'Arkansas',
      'Ashley',
      'Baxter',
      'Benton',
      'Boone',
      'Bradley',
      'Calhoun',
      'Carroll',
      'Chicot',
      'Clark',
      'Clay',
      'Cleburne',
      'Cleveland',
      'Columbia',
      'Conway',
    ],

    California: [
      'Los Angeles',
      'San Diego',
      'Orange',
      'Riverside',
      'San Bernardino',
      'Santa Clara',
      'Alameda',
      'Sacramento',
      'Contra Costa',
      'Fresno',
      'Kern',
      'San Francisco',
      'Ventura',
      'San Mateo',
      'Santa Barbara',
    ],

    Colorado: [
      'Adams',
      'Arapahoe',
      'Boulder',
      'Broomfield',
      'Denver',
      'Douglas',
      'El Paso',
      'Jefferson',
      'Larimer',
      'Mesa',
      'Pueblo',
      'Weld',
      'Garfield',
      'Eagle',
      'Pitkin',
    ],

    Connecticut: [
      'Fairfield',
      'Hartford',
      'Litchfield',
      'Middlesex',
      'New Haven',
      'New London',
      'Tolland',
      'Windham',
      'Bridgeport',
      'Stamford',
      'Waterbury',
      'Norwalk',
      'Danbury',
      'Greenwich',
      'Westport',
    ],

    Delaware: [
      'New Castle',
      'Kent',
      'Sussex',
      'Wilmington',
      'Dover',
      'Newark',
      'Middletown',
      'Smyrna',
      'Milford',
      'Seaford',
    ],

    Florida: [
      'Miami-Dade',
      'Broward',
      'Palm Beach',
      'Hillsborough',
      'Orange',
      'Pinellas',
      'Duval',
      'Lee',
      'Polk',
      'Collier',
      'Marion',
      'Volusia',
      'Pasco',
      'Seminole',
      'Sarasota',
    ],

    Georgia: [
      'Fulton',
      'Gwinnett',
      'Cobb',
      'DeKalb',
      'Chatham',
      'Clayton',
      'Cherokee',
      'Henry',
      'Hall',
      'Forsyth',
      'Richmond',
      'Muscogee',
      'Bibb',
      'Dougherty',
      'Lowndes',
    ],

    Hawaii: [
      'Honolulu',
      'Hawaii',
      'Maui',
      'Kauai',
      'Kalawao',
      'Oahu',
      'Molokai',
      'Lanai',
      'Hilo',
      'Kailua',
    ],

    Idaho: [
      'Ada',
      'Adams',
      'Bannock',
      'Bear Lake',
      'Benewah',
      'Bingham',
      'Blaine',
      'Boise',
      'Bonner',
      'Bonneville',
      'Boundary',
      'Butte',
      'Camas',
      'Canyon',
      'Caribou',
    ],

    Illinois: [
      'Cook',
      'DuPage',
      'Lake',
      'Will',
      'Kane',
      'McHenry',
      'Winnebago',
      'Madison',
      'St. Clair',
      'Sangamon',
      'Peoria',
      'Champaign',
      'Rock Island',
      'Tazewell',
      'Kendall',
    ],

    Indiana: [
      'Marion',
      'Lake',
      'Allen',
      'Hamilton',
      'St. Joseph',
      'Elkhart',
      'Tippecanoe',
      'Vanderburgh',
      'Johnson',
      'Monroe',
      'Delaware',
      'Madison',
      'LaPorte',
      'Porter',
      'Hendricks',
    ],

    Iowa: [
      'Polk',
      'Linn',
      'Scott',
      'Johnson',
      'Black Hawk',
      'Woodbury',
      'Dubuque',
      'Story',
      'Pottawattamie',
      'Dallas',
      'Warren',
      'Clinton',
      'Muscatine',
      'Marshall',
      'Jasper',
    ],

    Kansas: [
      'Johnson',
      'Sedgwick',
      'Shawnee',
      'Wyandotte',
      'Douglas',
      'Riley',
      'Saline',
      'Leavenworth',
      'Ford',
      'Butler',
      'Finney',
      'Crawford',
      'Harvey',
      'Barton',
      'Geary',
    ],

    Kentucky: [
      'Jefferson',
      'Fayette',
      'Kenton',
      'Boone',
      'Warren',
      'Hardin',
      'Campbell',
      'Madison',
      'Daviess',
      'Bullitt',
      'Oldham',
      'Boyd',
      'Jessamine',
      'Christian',
      'Scott',
    ],

    Louisiana: [
      'Orleans',
      'Jefferson',
      'East Baton Rouge',
      'Caddo',
      'St. Tammany',
      'Lafayette',
      'Calcasieu',
      'Ouachita',
      'Livingston',
      'Tangipahoa',
      'Rapides',
      'Terrebonne',
      'Bossier',
      'Ascension',
      'Iberia',
    ],

    Maine: [
      'Cumberland',
      'York',
      'Penobscot',
      'Kennebec',
      'Androscoggin',
      'Aroostook',
      'Oxford',
      'Sagadahoc',
      'Lincoln',
      'Knox',
      'Waldo',
      'Hancock',
      'Washington',
      'Piscataquis',
      'Franklin',
    ],

    Maryland: [
      'Montgomery',
      'Prince George’s',
      'Baltimore',
      'Anne Arundel',
      'Howard',
      'Frederick',
      'Harford',
      'Carroll',
      'Charles',
      'Washington',
      'Calvert',
      'St. Mary’s',
      'Allegany',
      'Cecil',
      'Wicomico',
    ],

    Massachusetts: [
      'Middlesex',
      'Worcester',
      'Essex',
      'Suffolk',
      'Norfolk',
      'Bristol',
      'Plymouth',
      'Hampden',
      'Hampshire',
      'Barnstable',
      'Berkshire',
      'Franklin',
      'Dukes',
      'Nantucket',
    ],

    Michigan: [
      'Wayne',
      'Oakland',
      'Macomb',
      'Kent',
      'Genesee',
      'Washtenaw',
      'Ingham',
      'Ottawa',
      'Kalamazoo',
      'Saginaw',
      'Livingston',
      'Jackson',
      'Muskegon',
      'Monroe',
      'Berrien',
    ],

    Minnesota: [
      'Hennepin',
      'Ramsey',
      'Dakota',
      'Anoka',
      'Washington',
      'St. Louis',
      'Olmsted',
      'Stearns',
      'Scott',
      'Wright',
      'Carver',
      'Blue Earth',
      'Rice',
      'Crow Wing',
      'Beltrami',
    ],

    Mississippi: [
      'Hinds',
      'Harrison',
      'DeSoto',
      'Rankin',
      'Jackson',
      'Madison',
      'Lee',
      'Lafayette',
      'Jones',
      'Forrest',
      'Lowndes',
      'Warren',
      'Adams',
      'Panola',
      'Marshall',
    ],

    Missouri: [
      'St. Louis',
      'Jackson',
      'St. Charles',
      'Greene',
      'Clay',
      'Jefferson',
      'Boone',
      'Cass',
      'Platte',
      'Jasper',
      'Cole',
      'Cape Girardeau',
      'Franklin',
      'Buchanan',
      'Christian',
    ],

    Montana: [
      'Yellowstone',
      'Missoula',
      'Gallatin',
      'Flathead',
      'Cascade',
      'Lewis and Clark',
      'Ravalli',
      'Silver Bow',
      'Lake',
      'Hill',
      'Park',
      'Carbon',
      'Custer',
      'Fergus',
      'Roosevelt',
    ],

    Nebraska: [
      'Douglas',
      'Lancaster',
      'Sarpy',
      'Hall',
      'Buffalo',
      'Dodge',
      'Madison',
      'Scotts Bluff',
      'Lincoln',
      'Saunders',
      'Gage',
      'Platte',
      'Adams',
      'York',
      'Washington',
    ],

    Nevada: [
      'Clark',
      'Washoe',
      'Carson City',
      'Elko',
      'Douglas',
      'Nye',
      'Lyon',
      'Churchill',
      'Humboldt',
      'White Pine',
      'Pershing',
      'Storey',
      'Mineral',
      'Esmeralda',
      'Lincoln',
    ],

    NewYork: [
      'Kings',
      'Queens',
      'New York',
      'Suffolk',
      'Bronx',
      'Nassau',
      'Westchester',
      'Erie',
      'Monroe',
      'Richmond',
      'Onondaga',
      'Orange',
      'Albany',
      'Dutchess',
      'Rockland',
    ],

    Texas: [
      'Anderson',
      'Andrews',
      'Angelina',
      'Aransas',
      'Archer',
      'Armstrong',
      'Atascosa',
      'Austin',
      'Bailey',
      'Bandera',
      'Bastrop',
      'Baylor',
      'Bee',
      'Bell',
      'Bexar',
      'Blanco',
      'Borden',
      'Bosque',
      'Bowie',
      'Brazoria',
      'Brazos',
      'Brewster',
      'Briscoe',
      'Brooks',
      'Brown',
      'Burleson',
      'Burnet',
      'Caldwell',
      'Calhoun',
      'Callahan',
      'Cameron',
      'Camp',
      'Carson',
      'Cass',
      'Castro',
      'Chambers',
      'Cherokee',
      'Childress',
      'Clay',
      'Cochran',
      'Coke',
      'Coleman',
      'Collin',
      'Collingsworth',
      'Colorado',
      'Comal',
      'Comanche',
      'Concho',
      'Cooke',
      'Coryell',
      'Cottle',
      'Crane',
      'Crockett',
      'Crosby',
      'Culberson',
      'Dallam',
      'Dallas',
      'Dawson',
      'Deaf Smith',
      'Delta',
      'Denton',
      'DeWitt',
      'Dickens',
      'Dimmit',
      'Donley',
      'Duval',
      'Eastland',
      'Ector',
      'Edwards',
      'Ellis',
      'El Paso',
      'Erath',
      'Falls',
      'Fannin',
      'Fayette',
      'Fisher',
      'Floyd',
      'Foard',
      'Fort Bend',
      'Franklin',
      'Freestone',
      'Frio',
      'Gaines',
      'Galveston',
      'Garza',
      'Gillespie',
      'Glasscock',
      'Goliad',
      'Gonzales',
      'Gray',
      'Grayson',
      'Gregg',
      'Grimes',
      'Guadalupe',
      'Hale',
      'Hall',
      'Hamilton',
      'Hansford',
      'Hardeman',
      'Hardin',
      'Harris',
      'Harrison',
      'Hartley',
      'Haskell',
      'Hays',
      'Hemphill',
      'Henderson',
      'Hidalgo',
      'Hill',
      'Hockley',
      'Hood',
      'Hopkins',
      'Houston',
      'Howard',
      'Hudspeth',
      'Hunt',
      'Hutchinson',
      'Irion',
      'Jack',
      'Jackson',
      'Jasper',
      'Jeff Davis',
      'Jefferson',
      'Jim Hogg',
      'Jim Wells',
      'Johnson',
      'Jones',
      'Karnes',
      'Kaufman',
      'Kendall',
      'Kenedy',
      'Kent',
      'Kerr',
      'Kimble',
      'King',
      'Kinney',
      'Kleberg',
      'Knox',
      'La Salle',
      'Lamar',
      'Lamb',
      'Lampasas',
      'Lavaca',
      'Lee',
      'Leon',
      'Liberty',
      'Limestone',
      'Lipscomb',
      'Live Oak',
      'Llano',
      'Loving',
      'Lubbock',
      'Lynn',
      'Madison',
      'Marion',
      'Martin',
      'Mason',
      'Matagorda',
      'Maverick',
      'McCulloch',
      'McLennan',
      'McMullen',
      'Medina',
      'Menard',
      'Midland',
      'Milam',
      'Mills',
      'Mitchell',
      'Montague',
      'Montgomery',
      'Moore',
      'Morris',
      'Motley',
      'Nacogdoches',
      'Navarro',
      'Newton',
      'Nolan',
      'Nueces',
      'Ochiltree',
      'Oldham',
      'Orange',
      'Palo Pinto',
      'Panola',
      'Parker',
      'Parmer',
      'Pecos',
      'Polk',
      'Potter',
      'Presidio',
      'Rains',
      'Randall',
      'Reagan',
      'Real',
      'Red River',
      'Reeves',
      'Refugio',
      'Roberts',
      'Robertson',
      'Rockwall',
      'Runnels',
      'Rusk',
      'Sabine',
      'San Augustine',
      'San Jacinto',
      'San Patricio',
      'San Saba',
      'Schleicher',
      'Scurry',
      'Shackelford',
      'Shelby',
      'Sherman',
      'Smith',
      'Somervell',
      'Starr',
      'Stephens',
      'Sterling',
      'Stonewall',
      'Sutton',
      'Swisher',
      'Tarrant',
      'Taylor',
      'Terrell',
      'Terry',
      'Throckmorton',
      'Titus',
      'Tom Green',
      'Travis',
      'Trinity',
      'Tyler',
      'Upshur',
      'Upton',
      'Uvalde',
      'Val Verde',
      'Van Zandt',
      'Victoria',
      'Walker',
      'Waller',
      'Ward',
      'Washington',
      'Webb',
      'Wharton',
      'Wheeler',
      'Wichita',
      'Wilbarger',
      'Willacy',
      'Williamson',
      'Wilson',
      'Winkler',
      'Wise',
      'Wood',
      'Yoakum',
      'Young',
      'Zapata',
      'Zavala',
    ],

    Washington: [
      'King',
      'Pierce',
      'Snohomish',
      'Spokane',
      'Clark',
      'Thurston',
      'Kitsap',
      'Yakima',
      'Whatcom',
      'Benton',
      'Skagit',
      'Cowlitz',
      'Chelan',
      'Grant',
      'Franklin',
    ],

    Wisconsin: [
      'Milwaukee',
      'Dane',
      'Waukesha',
      'Brown',
      'Racine',
      'Outagamie',
      'Winnebago',
      'Rock',
      'Kenosha',
      'Washington',
      'Marathon',
      'Sheboygan',
      'La Crosse',
      'Eau Claire',
      'Fond du Lac',
    ],

    Wyoming: [
      'Laramie',
      'Natrona',
      'Campbell',
      'Sweetwater',
      'Fremont',
      'Albany',
      'Park',
      'Sheridan',
      'Uinta',
      'Carbon',
      'Lincoln',
      'Johnson',
      'Converse',
      'Goshen',
      'Washakie',
    ],
  };
  selectedSubCounties: Record<string, string[]> = {};
  toggleCounty(state: string, county: string, checked: boolean) {
    if (!this.selectedSubCounties[state]) {
      this.selectedSubCounties[state] = [];
    }

    if (checked) {
      if (!this.selectedSubCounties[state].includes(county)) {
        this.selectedSubCounties[state].push(county);
      }
    } else {
      this.selectedSubCounties[state] = this.selectedSubCounties[state].filter((c) => c !== county);
    }
  }

  removeState(stateName: string) {
    // remove from selectedState array
    this.selectedState = this.selectedState.filter((s) => s !== stateName);

    // remove all counties of this state from selectedCounty
    if (this.selectedSubCounties[stateName]) {
      const countiesToRemove = this.selectedSubCounties[stateName];

      this.selectedCounty = this.selectedCounty.filter(
        (county) => !countiesToRemove.includes(county),
      );
    }

    // delete state entry from selectedSubCounties map
    delete this.selectedSubCounties[stateName];

    // remove from dropdown selected list
    this.countiesKeyDropDowns.states.selected = this.countiesKeyDropDowns.states.selected.filter(
      (item: any) => item.item_text !== stateName,
    );

    // hide grid if active state was removed
    if (this.activeStatesForCounties === stateName) {
      this.activeStatesForCounties = null;
    }
  }

  onMultipleToggleChange(event: any) {
    this.multipleFullStateMode = event.target.checked;

    if (this.multipleFullStateMode) {
      // Full state → auto select all counties for all selected states
      this.multipleSelectedStates.forEach((state) => {
        this.multipleSelectedCounties[state] = [...(this.countiySubCountyMap[state] || [])];
      });
    } else {
      // With counties mode → clear counties
      this.multipleSelectedStates.forEach((state) => {
        this.multipleSelectedCounties[state] = [];
      });
    }
    this.updateStatesWithSelectedCounties();
  }

  removeCounty(countyName: string) {
    // remove from selectedCounty array
    this.selectedCounty = this.selectedCounty.filter((c) => c !== countyName);

    // remove from selectedSubCounties map
    Object.keys(this.selectedSubCounties).forEach((state) => {
      this.selectedSubCounties[state] = this.selectedSubCounties[state].filter(
        (c) => c !== countyName,
      );
    });
  }

  removeCountyFromState(state: string, county: string) {
    this.selectedSubCounties[state] = this.selectedSubCounties[state].filter((c) => c !== county);
  }

  isAllCountiesSelected(state: string): boolean {
    const all = this.countiySubCountyMap[state] || [];
    const selected = this.selectedSubCounties[state] || [];

    return all.length > 0 && all.length === selected.length;
  }

  toggleSelectAllCounties(state: string, checked: boolean) {
    if (checked) {
      // select all
      this.selectedSubCounties[state] = [...(this.countiySubCountyMap[state] || [])];
    } else {
      // unselect all
      this.selectedSubCounties[state] = [];
    }
  }

  onMultipleStateChange() {
    const selected = this.multipleStatesDropdown.selected;
    const newSelectedStates = selected.map((item: any) => item.item_text);

    // FULL STATE MODE
    if (this.multipleFullStateMode) {
      this.multipleSelectedStates = newSelectedStates;

      this.multipleSelectedStates.forEach((state) => {
        this.multipleSelectedCounties[state] = [...(this.countiySubCountyMap[state] || [])];
      });
    } else {
      const validStates = newSelectedStates.filter((state) => {
        if ((this.multipleSelectedCounties[state]?.length || 0) > 0) {
          return true;
        }

        if (state === newSelectedStates[newSelectedStates.length - 1]) {
          return true;
        }

        return false;
      });

      this.multipleSelectedStates = validStates;

      this.multipleStatesDropdown.selected = this.multipleStatesDropdown.selected.filter(
        (item: any) => validStates.includes(item.item_text),
      );

      this.multipleSelectedStates.forEach((state) => {
        if (!this.multipleSelectedCounties[state]) {
          this.multipleSelectedCounties[state] = [];
        }
      });
    }

    // Set active state
    if (this.multipleSelectedStates.length > 0) {
      this.multipleActiveState =
        this.multipleSelectedStates[this.multipleSelectedStates.length - 1];
    } else {
      this.multipleActiveState = null;
    }
  }

  toggleMultipleCounty(state: string, county: string, checked: boolean) {
    if (!this.multipleSelectedCounties[state]) {
      this.multipleSelectedCounties[state] = [];
    }

    if (checked) {
      if (!this.multipleSelectedCounties[state].includes(county)) {
        this.multipleSelectedCounties[state].push(county);
      }
    } else {
      this.multipleSelectedCounties[state] = this.multipleSelectedCounties[state].filter(
        (c) => c !== county,
      );
    }

    if ((this.multipleSelectedCounties[state]?.length || 0) === 0) {
      this.multipleSelectedStates = this.multipleSelectedStates.filter((s) => s !== state);

      delete this.multipleSelectedCounties[state];

      if (this.multipleSelectedStates.length > 0) {
        this.multipleActiveState =
          this.multipleSelectedStates[this.multipleSelectedStates.length - 1];
      } else {
        this.multipleActiveState = null;
      }
    }
    this.updateStatesWithSelectedCounties();
  }

  removeMultipleState(state: string) {
    this.multipleSelectedStates = this.multipleSelectedStates.filter((s) => s !== state);
    delete this.multipleSelectedCounties[state];
    if (this.multipleSelectedStates.length > 0) {
      this.multipleActiveState =
        this.multipleSelectedStates[this.multipleSelectedStates.length - 1];
    } else {
      this.multipleActiveState = null;
    }
    this.updateStatesWithSelectedCounties();
  }
  removeMultipleCounty(state: string, county: string) {
    this.multipleSelectedCounties[state] = this.multipleSelectedCounties[state].filter(
      (c) => c !== county,
    );
    this.updateStatesWithSelectedCounties();
  }

  isAllMultipleCountiesSelected(state: string): boolean {
    const all = this.countiySubCountyMap[state] || [];
    const selected = this.multipleSelectedCounties[state] || [];
    return all.length > 0 && all.length === selected.length;
  }

  toggleSelectAllMultiple(state: string, checked: boolean) {
    if (checked) {
      this.multipleSelectedCounties[state] = [...(this.countiySubCountyMap[state] || [])];
    } else {
      this.multipleSelectedCounties[state] = [];
    }
  }

  isStateMarked(state: string): boolean {
    return (this.multipleSelectedCounties[state]?.length || 0) > 0;
  }

  updateStatesWithSelectedCounties() {
    this.statesWithSelectedCounties = this.multipleSelectedStates.filter(
      (state) => (this.multipleSelectedCounties[state]?.length || 0) > 0,
    );
  }

  onSingleStateChange() {
    const selected = this.countiesKeyDropDowns.states.selected;
    if (!selected || selected.length === 0) {
      this.activeStatesForCounties = null;
      this.selectedState = [];
      this.selectedSubCounties = {};
      return;
    }
    const stateName = selected[0].item_text;
    this.selectedState = [stateName];
    this.activeStatesForCounties = stateName;
    if (this.singleFullStateMode) {
      this.selectedSubCounties[stateName] = [...(this.countiySubCountyMap[stateName] || [])];
    } else {
      this.selectedSubCounties[stateName] = [];
    }
  }

  onSingleToggleChange(event: any) {
    this.singleFullStateMode = event.target.checked;

    const state = this.activeStatesForCounties;
    if (!state) return;

    if (this.singleFullStateMode) {
      this.selectedSubCounties[state] = [...(this.countiySubCountyMap[state] || [])];
    } else {
      this.selectedSubCounties[state] = [];
    }
  }

  clearAllSelections() {
    // ----- Single Mode -----
    this.selectedState = [];
    this.selectedSubCounties = {};
    this.countiesKeyDropDowns.states.selected = [];
    this.activeStatesForCounties = null;

    // ----- Multiple Mode -----
    this.multipleSelectedStates = [];
    this.multipleSelectedCounties = {};
    this.multipleStatesDropdown.selected = [];
    this.multipleActiveState = null;
  }

  saveStatesAndCounties() {
    // SINGLE MODE
    if (this.grantMode === 'single') {
      if (!this.selectedState.length) {
        return;
      }

      const state = this.selectedState[0];

      const counties = this.singleFullStateMode
        ? this.countiySubCountyMap[state] || []
        : this.selectedSubCounties[state] || [];

      return;
    }

    // MULTIPLE MODE
    if (this.grantMode === 'multiple') {
      const result = this.multipleSelectedStates.map((state) => ({
        state: state,
        counties: this.multipleFullStateMode
          ? this.countiySubCountyMap[state] || []
          : this.multipleSelectedCounties[state] || [],
      }));

      return;
    }

    // ALL MODE (optional)
    if (this.grantMode === 'all') {
      const result = Object.keys(this.countiySubCountyMap).map((state) => ({
        state: state,
        counties: this.countiySubCountyMap[state],
      }));

      return;
    }
  }

  generateCountiesFromText() {
    if (!this.pasteText.trim()) {
      alert('Please paste some text');
      return;
    }

    const text = this.pasteText.toLowerCase();
    const detectedStates: string[] = [];

    Object.keys(this.countiySubCountyMap).forEach((state) => {
      if (text.includes(state.toLowerCase())) {
        detectedStates.push(state);
      }
    });

    if (detectedStates.length === 0) {
      alert('Please mention at least one state name.');
      return;
    }

    if (this.grantMode === 'single') {
      const state = detectedStates[0];

      this.selectedState = [state];
      this.activeStatesForCounties = state;

      this.countiesKeyDropDowns.states.selected = this.countiesKeyDropDowns.states.data.filter(
        (item: any) => item.item_text === state,
      );

      if (!this.selectedSubCounties[state]) {
        this.selectedSubCounties[state] = [];
      }

      let countyFound = false;

      this.countiySubCountyMap[state].forEach((county) => {
        const regex = new RegExp(`\\b${county.toLowerCase()}\\b`, 'i');

        if (regex.test(text)) {
          countyFound = true;

          if (!this.selectedSubCounties[state].includes(county)) {
            this.selectedSubCounties[state].push(county);
          }
        }
      });

      //  county found FULL STATE AUTO SELECT
      if (!countyFound) {
        this.selectedSubCounties[state] = [...this.countiySubCountyMap[state]];
        this.singleFullStateMode = true;
      }
    }

    if (this.grantMode === 'multiple') {
      detectedStates.forEach((state) => {
        if (!this.multipleSelectedStates.includes(state)) {
          this.multipleSelectedStates.push(state);
        }

        if (!this.multipleSelectedCounties[state]) {
          this.multipleSelectedCounties[state] = [];
        }

        let countyFound = false;

        this.countiySubCountyMap[state].forEach((county) => {
          const regex = new RegExp(`\\b${county.toLowerCase()}\\b`, 'i');

          if (regex.test(text)) {
            countyFound = true;

            if (!this.multipleSelectedCounties[state].includes(county)) {
              this.multipleSelectedCounties[state].push(county);
            }
          }
        });
        if (!countyFound) {
          this.multipleSelectedCounties[state] = [...this.countiySubCountyMap[state]];
          this.multipleFullStateMode = true;
        }
      });

      this.multipleActiveState = detectedStates[0];
    }
    this.multipleStatesDropdown.selected = this.multipleStatesDropdown.data.filter((item: any) =>
      this.multipleSelectedStates.includes(item.item_text),
    );
    this.showPasteModal = false;
  }
}
