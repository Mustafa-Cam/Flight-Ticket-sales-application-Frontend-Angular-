import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { ClientRoutingModule } from './client-routing.module';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightBookingComponent,
    HomeComponent,
    FlightListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule,  // Routing modülünü buraya ekliyoruz
    // ToastrModule.forRoot(),
  ]
})
export class ClientModule { }
