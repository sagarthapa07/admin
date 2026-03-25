import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbInputDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/component/header/header';




@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgbInputDatepicker, FormsModule, Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
	  model: NgbDateStruct | null = null;
}
