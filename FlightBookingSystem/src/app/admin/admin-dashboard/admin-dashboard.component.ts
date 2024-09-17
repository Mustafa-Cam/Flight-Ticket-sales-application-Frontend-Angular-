import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  flights: any[] = [];

  constructor(private flightService: FlightService,private router: Router) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getFlights().subscribe(
      data => {
        // console.log('uçuşlar yüklendi:', data);
        this.flights = data;
      },
      error => {
        console.error('Uçuşları alırken hata oluştu:', error);
      }
    );
  }

  cancelFlight(flightId: number) {
    this.flightService.cancelFlight(flightId).subscribe(
      response => {
        console.log('Uçuş iptal edildi:', response);
        this.loadFlights();  // Uçuşları yeniden yükle
      },
      error => {
        console.error('Uçuş iptal sırasında hata oluştu:', error);
      }
    );
  }

  onEditFlight(flight: any): void {
    this.router.navigate(['/admin/edit-flight', flight.id]);
  }
  

   // Yeni uçuş oluşturma sayfasına yönlendir
   onCreateFlight(): void {
    this.router.navigate(['/admin/create-flight']);
  }
}
