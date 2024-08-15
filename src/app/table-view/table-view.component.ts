import { Component, Input, input, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; 
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { GitserviceService } from '../gitservice.service';
import { GitColumns } from '../interface';


@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent implements OnInit{

  constructor(private _gitserviceService:GitserviceService){}

  tableData!:Array<Object>;
 
  colDefs: ColDef[] = [
    { field: "name", filter: "agNumberColumnFilter" },
    { field: "createdAt", filter: "agNumberColumnFilter"  },
    { field: "stargazerCount", filter: "agNumberColumnFilter" },
    { field: "projectsUrl",filter: "agNumberColumnFilter",minWidth: 380 }
  ];

  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };

  public rowSelection: "single" | "multiple" = "multiple";
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  public themeClass: string = "ag-theme-quartz";

  ngOnInit(): void {
    this._gitserviceService.getDetailsOfRepo().valueChanges.subscribe((result: any) => {
      console.log()
      this.tableData = result.data.viewer.repositories.nodes;
    });
  }
}
