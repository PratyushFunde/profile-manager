import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {path:'',component:MainComponent},
    {path:'map',component:AdminComponent}
];
