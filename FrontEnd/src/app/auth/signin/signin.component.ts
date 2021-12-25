import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserAuth } from 'src/app/models/UserAuth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  userForm!: FormGroup;
  user!: User;


  constructor(private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }
  onLoggedin() {
    this.authService.getUserAuth(this.userForm.get('email')?.value).subscribe(
      (usr: UserAuth) => {
        let userAuth={
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('password')?.value,
        }
        console.log(usr);
        if (usr == null)
          alert('UserName incorrecte!');
        if (usr.password == userAuth.password) {
          this.authService.signIn(usr);
        } else alert(' mot de passe incorrecte!');
      }, (err: any) => { alert('UserName incorrecte!'); }
    );

  }
  /* get user */
  getUser(){
    this.authService.getUser(localStorage.getItem('loggedUser'))
    .subscribe(
      (reponse : User) => {
        console.log('get successfully');
      },
      (error) => {
        console.log('errer get !' + error);
      }
    );
  }

}
