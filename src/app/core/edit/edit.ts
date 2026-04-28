import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SeoSocialComponent } from "../seo-social/seo-social";
import { CountiesComponent } from "../counties/counties";
import { FocusAreaComponent } from "../focus-areas/focus-areas";
import { GeoLocationComponent } from "../geo-location/geo-location";
// import { Header } from "../../shared/component/header/header";


import { Header } from "../../shared/component/header/header";
import { FocusGroupsComponent } from "../focus-groups/focus-groups";
import { CalendarDetails } from "../calendar-details/calendar-details";
import { Api } from "../Services/api";
import { GrantDetail, GrantApiResponse } from "../../datatype";
import { Input } from "@angular/core";
@Component({
  standalone: true,
  selector: "app-example",
  imports: [
  CommonModule,
  FormsModule,
  SeoSocialComponent,
  CountiesComponent,
  FocusAreaComponent,
  GeoLocationComponent,
  Header,
  FocusGroupsComponent,
  CalendarDetails
  ],
  templateUrl: "./edit.html",
  styleUrl: "./edit.scss",
})
export class Edit {
  opportunityForm: FormGroup;

  menuItems = [
    "Calender Details",
    "Geo Location",
    "Focus Areas",
    "Focus Groups",
    "Counties",
    "Seo/Social Media",
  ];

  activeItem = "Calender Details";
  grantData: GrantDetail | null = null;
  @Input() grantId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: Api
  ) {
    this.opportunityForm = this.fb.group({
      title: [""],
      linkUrl: [""],
      postDate: [""],
      deadlineDate: [""],
      isOngoing: [false],
      shortInfo: [""],
      donorType: ["US Donors"],
      donorAgency: [""],
      donorAgencyOther: [""],
      grantType: [""],
      grantDuration: [""],
      grantSize: [""],
      status: ["Draft"],
      letterText: [""],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.getGrantDetails(+id);
    }
  }
  getGrantDetails(id: number) {
    this.api.getGrantById(id).subscribe({
      next: (res: GrantApiResponse) => {
        const mapped = this.mapGrantData(res);
        this.grantData = { ...mapped }; // force change detection
      },
    });
  }
  formatDate(date: string): string {
    return date ? date.split("T")[0] : "";
  }
  mapGrantData(res: GrantApiResponse): GrantDetail {
    const data = res.usGrantDataWithURL.grantData;
    const url = res.usGrantDataWithURL.urlData;

    return {
      id: data.grantIndex,
      title: data.grantTitle,
      friendlyURL: url?.friendlyURLText || "",
      linkUrl: data.linkURL,
      postDate: this.formatDate(data.postDate),
      deadlineDate: this.formatDate(data.deadLineDate),
      isOngoing: data.onGoingGrants === 1,
      shortInfo: data.shortIntro,
      donorType: data.donorType === "UD" ? "US Donors" : data.donorType,
      donorAgency: data.donorAgency,
      donorAgencyOther: data.donorAgency,
      grantType: data.grantType?.split("|")[0]?.trim() || "",
      grantDuration: this.normalizeDuration(data.grantDuration),
      grantSize: data.grantSize?.trim() || "",
      status: data.status || "",
      letterText: data.grantContent || "",
      img: data.grantLogoImage || "",
    };
  }

  normalizeDuration(value: string): string {
    if (!value) return "";
    const clean = value.trim().toLowerCase();
    if (clean.includes("less than 1")) return "Less than 1 Year";
    if (clean.includes("1 year")) return "1 Year";
    if (clean.includes("2 year")) return "2 Year";
    if (clean.includes("3 year")) return "3 Year";
    if (clean.includes("4 year")) return "4 Year";
    if (clean.includes("5 year")) return "5 Year";
    if (clean.includes("5–10")) return "5–10 Years";
    if (clean.includes("not mentioned")) return "Grant Duration Not Mentioned";
    return "";
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  onSave() {
    console.log(this.opportunityForm.value);
  }

  gotoPreview() {
    this.router.navigate(["/preview"]);
  }

  goToGeoLocation() {
    this.activeItem = "Geo Location";
  }
}
