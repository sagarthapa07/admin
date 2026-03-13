import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbInputDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/component/header/header';
import { Editor } from "../editor/editor";



@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgbInputDatepicker, FormsModule, Header, Editor],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
	  model: NgbDateStruct | null = null;
}
