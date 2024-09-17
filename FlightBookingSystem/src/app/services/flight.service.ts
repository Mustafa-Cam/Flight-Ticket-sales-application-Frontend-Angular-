import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  // currentFlight: any = null; // Geçici veri saklama
  private apiUrl = 'http://localhost:5269/api/flight'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Tüm uçuşları al
  getFlights(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Yeni uçuş oluştur
  createFlight(flight: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, flight);
  }

  // Uçuşu iptal et
  cancelFlight(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

   // Uçuşu ID ile getir
   getFlightById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Uçuş güncelle
  updateFlight(id: number, flightData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, flightData);
  }

  // Filtreleme ile uçuş ara
  searchFlights(criteria: any): Observable<any[]> {
    let params = new HttpParams();
    
    if (criteria.Departure) {
      params = params.append('Departure', criteria.Departure);
    }
    if (criteria.Arrival) {
      params = params.append('Arrival', criteria.Arrival);
    }
    if (criteria.startDate) {
      params = params.append('startDate', criteria.startDate);
    }
    if (criteria.endDate) {
      params = params.append('endDate', criteria.endDate);
    }
    if (criteria.minPrice) {
      params = params.append('minPrice', criteria.minPrice.toString());
    }
    if (criteria.maxPrice) {
      params = params.append('maxPrice', criteria.maxPrice.toString());
    }
    if (criteria.capacity) {
      params = params.append('capacity', criteria.capacity.toString());
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
}