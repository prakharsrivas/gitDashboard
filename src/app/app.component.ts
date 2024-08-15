import { Component,OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { TableViewComponent } from './table-view/table-view.component';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { CommonModule } from '@angular/common';
import { GitserviceService } from './gitservice.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,TableViewComponent,GraphViewComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'gitDashboard';
  loadflag:boolean=false;
  dataSet!:Array<object>;

  constructor( private gitserviceService:GitserviceService) {}
 
  ngOnInit() {
    this.gitserviceService.getDetailsOfRepo();
  }
}
