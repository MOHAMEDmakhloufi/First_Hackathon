import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(){
    this.authService.getUser(localStorage.getItem('loggedUser'))
    .subscribe(
      (reponse : User) => {
       
        this.user= reponse;
        this.authService.idUser= reponse.id;
        console.log(this.user);
      },
      (error) => {
        console.log('errer get !' + error);
      }
    );
  }

}
