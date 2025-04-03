import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private users :user[]= [
    {
      id: "1",
      name: "Amit Sharma",
      email: "amit.sharma@example.com",
      lat: "28.7041",
      lng: "77.1025",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
      phoneno: 9876543210,
      description: "Software engineer with a passion for AI and machine learning."
    },
    {
      id: "2",
      name: "Priya Verma",
      email: "priya.verma@example.com",
      lat: "19.0760",
      lng: "72.8777",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      phoneno: 9123456789,
      description: "Digital marketer who loves crafting creative brand strategies."
    },
    {
      id: "3",
      name: "Ravi Kumar",
      email: "ravi.kumar@example.com",
      lat: "12.9716",
      lng: "77.5946",
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
      phoneno: 9087654321,
      description: "Entrepreneur and startup enthusiast building innovative solutions."
    },
    {
      id: "4",
      name: "Anjali Mehta",
      email: "anjali.mehta@example.com",
      lat: "13.0827",
      lng: "80.2707",
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
      phoneno: 9567834210,
      description: "Graphic designer with a keen eye for modern aesthetics."
    },
    {
      id: "5",
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      lat: "22.5726",
      lng: "88.3639",
      photo: "https://randomuser.me/api/portraits/men/5.jpg",
      phoneno: 9234567890,
      description: "Financial analyst helping businesses grow through data-driven decisions."
    },
    {
      id: "6",
      name: "Sanya Kapoor",
      email: "sanya.kapoor@example.com",
      lat: "26.9124",
      lng: "75.7873",
      photo: "https://randomuser.me/api/portraits/women/6.jpg",
      phoneno: 9876123450,
      description: "Travel blogger exploring the world and sharing unique experiences."
    },
    {
      id: "7",
      name: "Rajesh Nair",
      email: "rajesh.nair@example.com",
      lat: "9.9312",
      lng: "76.2673",
      photo: "https://randomuser.me/api/portraits/men/7.jpg",
      phoneno: 9012345678,
      description: "Fitness coach dedicated to promoting a healthy and active lifestyle."
    },
    {
      id: "8",
      name: "Pooja Iyer",
      email: "pooja.iyer@example.com",
      lat: "23.0225",
      lng: "72.5714",
      photo: "https://randomuser.me/api/portraits/women/8.jpg",
      phoneno: 9654321870,
      description: "UX designer passionate about creating seamless user experiences."
    },
    {
      id: "9",
      name: "Arun Das",
      email: "arun.das@example.com",
      lat: "15.2993",
      lng: "74.1240",
      photo: "https://randomuser.me/api/portraits/men/9.jpg",
      phoneno: 9109876543,
      description: "Photographer capturing the beauty of nature and urban life."
    },
    {
      id: "10",
      name: "Neha Choudhary",
      email: "neha.choudhary@example.com",
      lat: "25.3176",
      lng: "82.9739",
      photo: "https://randomuser.me/api/portraits/women/10.jpg",
      phoneno: 9998887776,
      description: "Content writer passionate about storytelling and creative writing."
    }
  ];
  
  private userBehaviourSubject=new BehaviorSubject<user[]>(this.users)
  users$ = this.userBehaviourSubject.asObservable();
  
  addUser(user:user)
  {
    this.users.unshift(user);
  }
  updateUser(updatedData:user)
  {
    const index=this.users.findIndex(user=>user.id===updatedData.id);

    if(index!=-1)
    {
      this.users[index]=updatedData;
    }

  }

  deleteUser(userId: string) {
    const updatedUsers = this.userBehaviourSubject.getValue().filter(user => user.id !== userId);
    this.userBehaviourSubject.next(updatedUsers);
  }
  
}
