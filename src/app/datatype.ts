// ================== GRANT (UI MODEL) ==================
export interface GrantDetail {
  id: number;
  title: string;
  friendlyURL: string;
  linkUrl: string;
  postDate: string;
  deadlineDate: string;
  isOngoing: boolean;
  shortInfo: string;
  donorType: string;
  donorAgency: string;
  donorAgencyOther: string;
  grantType: string;
  grantDuration: string;
  grantSize: string;
  status: string;
  letterText: string;
  img: string;
}

// ================== GRANT API RESPONSE ==================
export interface GrantApiResponse {
  usGrantDataWithURL: {
    grantData: {
      grantIndex: number;
      grantTitle: string;
      linkURL: string;
      postDate: string;
      deadLineDate: string;
      shortIntro: string;
      donorType: string;
      grantLogoImage: string;
      donorAgency: string;
      grantType: string;
      grantSize: string;
      grantDuration: string;
      status: string;
      grantContent: string;
      onGoingGrants: number;
    };
    urlData?: {
      friendlyURLText: string;
    };
  };
}

// ================== GRANTS LIST ==================
export interface GrantListItem {
  grantIndex: number;
  grantTitle: string;
  postDate: string;
  deadLineDate: string;
}

// ================== COMMON ==================
export interface DropdownItem {
  item_id: number;
  item_text: string;
}

// ================== STATES ==================
export interface State {
  stateIndex: number;
  stateName: string;
}

export interface GetStatesResponse {
  usStates: State[];
}

// ================== COUNTIES ==================
export interface County {
  countyName: string;
}

export interface GetCountiesResponse {
  usgeoCounties: County[];
}

// ================== CITIES ==================
export interface City {
  cityIndex: number;
  cityName: string;
}

export interface GetCitiesResponse {
  usCities: City[];
}

// ================== TOWNSHIP ==================
export interface Township {
  townshipIndex: number;
  townshipName: string;
}

export interface GetTownshipResponse {
  usTownships: Township[];
}

// ================== INSULAR ==================
export interface InsularArea {
  areaIndex: number;
  areaName: string;
}

export interface GetInsularResponse {
  usInsularAreas: InsularArea[];
}

// ================== FOCUS AREA ==================
export interface FocusArea {
  issueIndex: number;
  issueName: string;
}

export interface GetFocusAreasResponse {
  successCode: number;
  usFocusAreas: FocusArea[];
}

// ================== FOCUS SUB AREA ==================
export interface FocusSubArea {
  subIssueIndex: number;
  subIssueName: string;
}

export interface GetFocusSubAreasResponse {
  successCode: number;
  myList: FocusSubArea[];
}

// ================== BENEFICIARY ==================
export interface Beneficiary {
  beneficiaryIndex: number;
  beneficiaryName: string;
}

export interface GetBeneficiariesResponse {
  tempUSBeneficiaries: Beneficiary[];
}

// ================== ENTITY ==================
export interface Entity {
  entIndex: number;
  entName: string;
}

export interface GetEntitiesResponse {
  usEntities: Entity[];
}

// ================== SUB ENTITY ==================
export interface SubEntity {
  subEntId: number;
  subEntName: string;
}

export interface GetSubEntitiesResponse {
  subEntities: SubEntity[];
}

// ================== SELECTED GEO ==================

export interface SelectedCity {
  cityIndex: number;
  cityName: string;
}

export interface GetSelectedCitiesResponse {
  cities: SelectedCity[];
}

export interface SelectedState {
  stateIndex: number;
  stateName: string;
}

export interface GetSelectedStatesResponse {
  states: SelectedState[];
}

export interface SelectedTownship {
  townshipIndex: number;
  townshipName: string;
}

export interface GetSelectedTownshipsResponse {
  townships: SelectedTownship[];
}

export interface SelectedInsular {
  areaIndex: number;
  areaName: string;
}

export interface GetSelectedInsularResponse {
  insularAreas: SelectedInsular[];
}
export interface GeoDropdown {
  label: string;
  data: DropdownItem[];
  selected: DropdownItem[];
}