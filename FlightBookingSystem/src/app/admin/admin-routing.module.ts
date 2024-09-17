import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent ,canActivate: [AuthGuard]},
  { path: 'create-flight', component: CreateFlightComponent , canActivate: [AuthGuard]},
  { path: 'edit-flight/:id', component: CreateFlightComponent , canActivate: [AuthGuard]}, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
