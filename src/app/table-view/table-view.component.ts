import { Component, OnInit, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { GitserviceService } from '../gitservice.service';
import { GitDashboardStore } from '../gitdashboard.store';
import { Node } from '../GitData.interface';


@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './table-view.component.html',
  providers: [GitDashboardStore],
  styleUrl: './table-view.component.css'
})
export class TableViewComponent implements OnInit {

  constructor(private _gitserviceService: GitserviceService) {}

  readonly store = inject(GitDashboardStore);

  tableData!: Array<Node>;

  colDefs: ColDef[] = [
    { field: "name", filter: "agNumberColumnFilter" },
    { field: "createdAt", filter: "agNumberColumnFilter" },
    { field: "stargazerCount", filter: "agNumberColumnFilter" },
    { field: "projectsUrl", filter: "agNumberColumnFilter", minWidth: 380 }
  ];

  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };

  public rowSelection: "single" | "multiple" = "multiple";
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  public themeClass: string = "ag-theme-quartz";

  ngOnInit() {
    this._gitserviceService.getDetailsOfRepo().subscribe((result: any) => {
      this.loadAll().then(() => {
        this.tableData = this.store.gitData();
      });
    });
  }
  async loadAll() {
    await this.store.loadAll()
  }
}
