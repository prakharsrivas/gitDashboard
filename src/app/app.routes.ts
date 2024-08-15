import { Routes } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';
import { AppComponent } from './app.component';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'table', component: TableViewComponent },
    // { path: '', component: AppComponent },
    { path: 'graph', component: GraphViewComponent },
    { path: 'home', component: HomeComponent },
];
