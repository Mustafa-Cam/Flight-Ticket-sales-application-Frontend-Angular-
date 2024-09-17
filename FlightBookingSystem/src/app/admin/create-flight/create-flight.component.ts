import { Component } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute ile ID'yi alırız.

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent {
  flightForm: FormGroup;
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
  filteredDepartureCities: string[] = [];
  filteredArrivalCities: string[] = [];
  isEditMode = false;  // Edit modunda olup olmadığını belirlemek için
  flightId: number | null = null;  // Uçuş ID'sini saklamak için

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute // ActivatedRoute ile id'yi almak için ekledik
  ) {
    this.flightForm = this.fb.group({
      Departure: ['', Validators.required],
      Arrival: ['', Validators.required],
      Date: ['', Validators.required],
      Time: ['', Validators.required],
      Capacity: ['', Validators.required],
      Price: ['', Validators.required],
      IsActive: [false]  // Checkbox başlangıçta false olacak
    });

    // Listen to value changes
    this.flightForm.get('Departure')?.valueChanges.subscribe(value => this.onDepartureInput(value));
    this.flightForm.get('Arrival')?.valueChanges.subscribe(value => this.onArrivalInput(value));
  }


  ngOnInit(): void {
    // URL'den flightId'yi kontrol et
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('Flight ID:', id);
      this.flightId = +id; // flightId'yi number'a çeviriyoruz
      this.isEditMode = true;
      this.loadFlightDetails();
    } else {
      this.isEditMode = false;
    }
  }
  


  loadFlightDetails(): void {
    if (this.flightId) {
      this.flightService.getFlightById(this.flightId).subscribe(
        (flight) => {
          console.log('Uçuş detayları:', flight);

          const flightDate = new Date(flight.date);
          const datePart = flightDate.toISOString().split('T')[0]; // Tarih kısmını ayır
          const timePart = flightDate.toISOString().split('T')[1].substring(0, 5); // Saat kısmını ayır
          
          this.flightForm.patchValue({
            Departure: flight.departure,
            Arrival: flight.arrival,
            Date: datePart,
            Time: timePart,
            Capacity: flight.capacity,
            Price: flight.price,
            IsActive: flight.isActive
          });
        },
        (error) => {
          console.error('Uçuş detayları alınamadı:', error);
        }
      );
    }
  }


  onSubmit(): void {
    if (this.flightForm.valid) {
      if (this.isEditMode && this.flightId !== null) {  // flightId null değilse
        this.flightService.updateFlight(this.flightId, this.flightForm.value).subscribe(
          () => {
            console.log('Urun guncellendi');
            this.router.navigate(['/admin']);  // Düzenleme sonrası dashboarda yönlendirme
          },
          (error) => {
            console.error('Uçuş düzenleme hatası:', error);
          }
        );
      } else {
        this.flightService.createFlight(this.flightForm.value).subscribe(
          () => {
            console.log('Urun oluşturuldu');
            this.router.navigate(['/admin']);  // Oluşturma sonrası dashboarda yönlendirme
          },
          (error) => {
            console.error('Uçuş oluşturma hatası:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }
  


  onDepartureInput(value: string): void {
    this.filteredDepartureCities = this.filterCities(value);
  }

  onArrivalInput(value: string): void {
    this.filteredArrivalCities = this.filterCities(value);
  }

  filterCities(value: string): string[] {
    if (value.length >= 1) {
      return this.cities.filter(city =>
        city.toLocaleLowerCase('tr-TR').startsWith(value.toLocaleLowerCase('tr-TR'))
      );
    } else {
      return [];
    }
  }

  selectDeparture(city: string): void {
    this.flightForm.get('Departure')?.setValue(city);
    this.filteredDepartureCities = [];
  }

  selectArrival(city: string): void { 
    this.flightForm.get('Arrival')?.setValue(city);
    this.filteredArrivalCities = [];
  }
}

