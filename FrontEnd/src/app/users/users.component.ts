import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { ProfileService } from '../services/Profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: User[];
  searchValue!: String;
  constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(){
    this.profileService.getAllUsers()
    .subscribe(
      (listeUsers: User[]) => {
          this.users = listeUsers;
          console.log(this.users);
          console.log('getAll terminé !');
          return this.users;
      },
      (error) => {
          console.log('erreur de sauvegarde !' + error);
      }
  );
  }

    /*-----------------Search By UserName-----------------------*/
    search(){
      
      if(this.searchValue == "")
        this.ngOnInit();
       else 
       this.users= this.users.filter(res =>{
        console.log(res.userName.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()));
         return res.userName.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase());
       })
    }
  

}
