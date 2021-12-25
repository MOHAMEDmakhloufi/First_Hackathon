import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    // this.authService.getAllUser();

  }
  initForm() {
    this.userForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthday: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password:  ['', [
          Validators.required, 
          Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
      ]],
        sexe: ['', Validators.required],
        phone: ['', Validators.required],
      }
    )
  }
  onSignup() {
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
    if(this.authService.createNewUser(user) == false)
      this.initForm();
  }
}
