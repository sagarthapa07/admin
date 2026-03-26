import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbInputDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/component/header/header';
import { DateRangePicker } from "../../shared/component/date-range-picker/date-range-picker";




@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgbInputDatepicker, FormsModule, Header, DateRangePicker],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
	  model: NgbDateStruct | null = null;
}
