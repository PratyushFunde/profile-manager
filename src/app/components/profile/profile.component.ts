import { Component, Input } from '@angular/core';
import { user } from '../../models/user';
import { NgFor, NgIf } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
    selector: 'app-profile',
    standalone:true,
    imports: [NgFor, GoogleMapsModule, NgIf],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
@Input() users:user[]=[];

  isMap:boolean=false;

center = { lat: 28.7041, lng: 77.1025 };
  zoom = 10;
  marker={position:{lat:28.7041,lng: 77.1025},title:'India',icon:''};



  

  onSummaryClick(lat?:string,lng?:string,title?:string,icon?:string)
  {
    this.addMarker(Number(lat),Number(lng),title);
    this.isMap=true
  }

  addMarker(lat: number, lng: number, title: string='') {
    this.marker.position={lat:lat,lng:lng}
    this.center=this.marker.position;
    this.marker.title=title
  }

  onCloseMap()
  {
    this.isMap=false;
  }

}
