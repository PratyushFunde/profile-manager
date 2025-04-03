import { CommonModule, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [CommonModule,GoogleMapsModule,RouterModule,NgFor],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})
export class GoogleMapComponent {
  center = { lat: 28.7041, lng: 77.1025 };
  zoom = 12;
  markers: any[] = [];

  ngOnInit() {
    this.addMarker(28.7041, 77.1025, "Delhi");
  }


  addMarker(lat: number, lng: number, title: string = '') {
    this.markers.push({
      position: { lat, lng },
      title: title
    });
  }
   

   displayLocationOnMap(latDMS: string, lngDMS: string) {
    // Helper function to convert DMS to decimal degrees
    function convertDMSToDecimal(dms: string): number {
      const parts = dms.match(/(\d+)°(\d+)'([\d.]+)"([NSEW])/i);
      if (!parts) return 0;
      
      const degrees = parseFloat(parts[1]);
      const minutes = parseFloat(parts[2]);
      const seconds = parseFloat(parts[3]);
      const direction = parts[4].toUpperCase();
      
      let decimal = degrees + (minutes / 60) + (seconds / 3600);
      
      // Apply sign based on direction
      if (direction === 'S' || direction === 'W') {
        decimal = -decimal;
      }
      
      return decimal;
    }
  
    // Convert coordinates
    const lat = convertDMSToDecimal(latDMS);
    const lng = convertDMSToDecimal(lngDMS);
  
    // Get the map container element
    const mapElement = document.getElementById('map') as HTMLElement;
    
    // Create map options with the converted coordinates
    const mapOptions: google.maps.MapOptions = {
      center: { lat, lng },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    // Create the map
    const map = new google.maps.Map(mapElement, mapOptions);
  
    // Add a marker at the location
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: 'Location'
    });
  }


  
}
