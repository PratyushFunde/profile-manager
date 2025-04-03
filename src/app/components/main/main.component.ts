import { Component, inject } from '@angular/core';
import { GoogleMapComponent } from "../google-map/google-map.component";
import { ProfileComponent } from "../profile/profile.component";
import { MapGeocoder } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { user } from '../../models/user';
import { NgClass, NgIf } from '@angular/common';
import { AdminComponent } from "../admin/admin.component";
import { AddProfileComponent } from "../add-profile/add-profile.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-main',
    standalone:true,
    imports: [ProfileComponent, NgIf, AdminComponent, AddProfileComponent, FormsModule, NgClass],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {

  dataService=inject(DataService)
  users:user[]=[];
  selectedTab:string='Home';

  recievedMessage:string='';

  searchString:string=''

  constructor(private geocoder:MapGeocoder,private http:HttpClient){
    this.dataService.users$.subscribe((result)=>{
      this.users=result;
    })
    
  }
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 15;
  markerPosition: google.maps.LatLngLiteral | undefined;


  get filteredUsers() {
    if (!this.searchString.trim()) {
      return this.users; // Return all users when search is empty
    }
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchString.toLowerCase()) ||
      user.description.toLowerCase().includes(this.searchString.toLowerCase())
    );
  }

  onHomeClick()
  {
    this.selectedTab='Home';
  }

  onAdminClick()
  {
    this.selectedTab='Admin';
  }

  onAllUsersmapClick()
  {

  }

 
  onAddClick()
  {
    this.selectedTab='Add';
  }

  handleMessage(msg:string)
  {
    if(msg=='OK'){
      this.selectedTab='Home';
    }

    if(msg=='CLOSE')
    {
      this.selectedTab='Admin'
    }
  }

}
