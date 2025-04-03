import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { user } from '../../models/user';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-profile.component.html',
  styleUrl: './add-profile.component.scss'
})
export class AddProfileComponent {
  http = inject(HttpClient);
  dataService=inject(DataService);
  isLoading:boolean=false;
  @Output() message = new EventEmitter<string>();

  geoCodingStatus: string = 'Failed';

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 15;
  markerPosition: google.maps.LatLngLiteral | undefined;


  onFormSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading=true;
      let lat = 0;
      let lng = 0;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(form.value.address)}&key=`+environment.googlAPIKEY;
      
      this.http.get(geocodeUrl).subscribe((response: any) => {
        this.isLoading=true;
        if (response.status === 'OK' && response.results.length > 0) {
          const location = response.results[0].geometry.location;

          const newData = {
            name: form.value.name,
            id: form.value.id,
            description: form.value.description,
            lat: location.lat,
            lng: location.lng,
            photo: form.value.url
          }
          this.dataService.addUser(newData);
          this.message.emit('OK')
          this.isLoading=false;
        }
        else {
          alert("Enter correct address")
          this.isLoading=false;
        }
      })
      
    }
    else {
      alert("Fill all fields");
      this.isLoading=false;
    }
  }

  onClose() {
    this.message.emit('CLOSE');
  }

  // onEditClick(user:user)
  // {
    
  // }

  save() {

  }

}
