import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/Profile.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  testUpdate: boolean = false;
  userForm!: FormGroup;
  user!: User;
  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.getUser();
  }
  // start Update
  onUpdate() {
    if (this.testUpdate == false)
      this.testUpdate = true;
    else
      this.testUpdate = false;
  }
  getUser() {
    this.authService.getUser(localStorage.getItem('loggedUser'))
      .subscribe(
        (reponse: User) => {
          this.initForm(reponse);
          console.log(this.user);
        },
        (error) => {
          console.log('errer get !' + error);
        }
      );
  }
  initForm(user: User) {
    this.userForm = this.formBuilder.group(
      {
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        birthday: [user.birthday, Validators.required],
        email: [user.email, Validators.required],
        password: [user.password, Validators.required],
        sexe: [user.sexe, Validators.required],
        phone: [user.phone, Validators.required],
      }
    )
  }
  update() {
    let user = {
      id: -1,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      userName: '',
      birthday: this.userForm.get('birthday')?.value,
      dateCreated: null,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      sexe: this.userForm.get('sexe')?.value,
      phone: this.userForm.get('phone')?.value,
    };
    if (this.profileService.updateUser(user) == false)
      this.ngOnInit();
    this.testUpdate = false;
  }
  // End Update
  onDelete() {
    var x = confirm("Are you sure you want to delete?");
    if (x)
      this.profileService.deleteUser(localStorage.getItem('loggedUser'));

  }

}
