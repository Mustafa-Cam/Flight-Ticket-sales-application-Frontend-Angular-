import { Component } from '@angular/core';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  search = {
    Departure: '',
    Arrival: '',
    startDate: '',
    endDate: '',
    minPrice: null,
    maxPrice: null,
    capacity: null
  };

  results: any[] = [];
  filteredDepartureCities: string[] = [];
  filteredArrivalCities: string[] = [];
  cities: string[] = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin',
    'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur',
    'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan',
    'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
    'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir',
    'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş',
    'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas',
    'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
  ]; 

  constructor(private flightService: FlightService) { }


  onSearch() {
    
    const searchParams = {
      Departure: this.search.Departure || null,
      Arrival: this.search.Arrival || null,
      startDate: this.search.startDate || null,
      endDate: this.search.endDate || null,
      minPrice: this.search.minPrice || null,
      maxPrice: this.search.maxPrice || null,
      capacity: this.search.capacity || null
    };
    this.flightService.searchFlights(searchParams).subscribe({
      
      next: (data) => {
        
        this.results = data;
        if (this.results.length === 0) {
          alert('Bu kriterlerde uçuş bulunamadı!');
        }
      },
      error: (error) => {
       console.log('Hata:', error);
        console.log('Search:',this.search);
        alert('Uçuş arama sırasında bir hata oluştu. '+ ' Hata: ' +  error.message);
      },
      complete: () => {
        console.log('Uçuş arama tamamlandı');}
    }
    );
  }

  bookFlight(flight: any) {
    console.log('Satın alınan uçuş:', flight);
    alert(`Uçuş başarıyla satın alındı: ${flight.departure} - ${flight.arrival} | ${flight.date}`);
  }


  onDepartureInput(value: string) {
   this.filteredDepartureCities= this.filterCities(value);
  }

  onArrivalInput(value: string) {
    this.filteredArrivalCities = this.filterCities(value);
  }

  filterCities(value: string) : string[]{
    if (value.length >= 1) {
     return  this.cities.filter(city =>
        city.toLocaleLowerCase('tr-TR').startsWith(value.toLocaleLowerCase('tr-TR'))
      );
     
    } else {
      return [];
    }
  }

  selectDeparture(city: string) {
    this.search.Departure = city;
    this.filteredDepartureCities = [];
  }

  selectArrival(city: string) {
    this.search.Arrival = city;
    this.filteredArrivalCities = [];
  }


}
