import { Component, inject } from '@angular/core';
import { user } from '../../models/user';
import { DataService } from '../../services/data.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-admin',
    standalone:true,
    imports: [NgFor,NgIf,FormsModule],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent {

  users:user[]=[]
  user: any | null = null;
  dataService=inject(DataService);

  

  ngOnInit()
  {
    this.dataService.users$.subscribe((result)=>{
      this.users=result;
    })
  }

  onEdit(user:user)
  {
    this.user=user;
    console.log(user);
  }

  onDelete(id:string)
  {
    this.dataService.deleteUser(id);
  }

  save()
  {
    this.dataService.updateUser(this.user)
  }

  onClose()
  {
    this.user=null;
  }
}
