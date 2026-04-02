export interface DropdownItem {
  item_id: number;
  item_text: string;
}
export interface State {
  stateIndex: number;
  stateName: string;
}
export interface GetStatesResponse {
  states: State[];
}
export interface County {
  countyName: string;
}
export interface GetCountiesResponse {
  usgeoCounties: County[];
}
export interface City {
  cityName: string;
}
export interface Township {
  townshipName: string;
}
export interface InsularArea {
  insularAreaName: string;
}
export interface FocusArea {
  issueId: number;
  issueName: string;
}
export interface FocusSubArea {
  subIssueId: number;
  subIssueName: string;
}
export interface Beneficiary {
  beneficiaryId: number;
  beneficiaryName: string;
}
export interface Entity {
  entId: number;
  entName: string;
}
export interface SubEntity {
  subEntId: number;
  subEntName: string;
}
export interface Grant {
  id: number;
  title: string;
  postDate: string;
}
export interface GetGrantsResponse {
  data: Grant[];
  totalRecords: number;
}
export interface DropdownItem {
  item_id: number;
  item_text: string;
}

export interface Beneficiary {
  beneficiaryIndex: number;
  beneficiaryName: string;
}

export interface GetBeneficiariesResponse {
  tempUSBeneficiaries: Beneficiary[];
}

export interface Entity {
  entIndex: number;
  entName: string;
}

export interface GetEntitiesResponse {
  usEntities: Entity[];
}

export interface SubEntity {
  subEntId: number;
  subEntName: string;
}

export interface GetSubEntitiesResponse {
  subEntities: SubEntity[];
}
export interface FocusArea {
  issueIndex: number;
  issueName: string;
}

export interface GetFocusAreasResponse {
  successCode: number;
  usFocusAreas: FocusArea[];
}

export interface FocusSubArea {
  subIssueIndex: number;
  subIssueName: string;
}

export interface GetFocusSubAreasResponse {
  successCode: number;
  myList: FocusSubArea[];
}

export interface City {
  cityIndex: number;
  cityName: string;
}

export interface GetCitiesResponse {
  usCities: City[];
}

export interface Township {
  townshipIndex: number;
  townshipName: string;
}

export interface GetTownshipResponse {
  usTownships: Township[];
}

export interface InsularArea {
  areaIndex: number;
  areaName: string;
}

export interface GetInsularResponse {
  usInsularAreas: InsularArea[];
}

export interface State {
  stateIndex: number;
  stateName: string;
}

export interface GetStatesResponse {
  usStates: State[];
}