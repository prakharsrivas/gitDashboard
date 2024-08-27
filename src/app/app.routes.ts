import { Routes } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'table', component: TableViewComponent },
    { path: 'graph', component: GraphViewComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
