import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { UserAuth } from '../models/UserAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host = environment.authBaseUrl + "/api/user";
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public idUser! : number;

  constructor(private httpClient: HttpClient,
    private router: Router) { }

// communication with dataBase
  createNewUser(user: User): boolean {
    this.httpClient.post<User>(this.host, user)
      .subscribe(
        (reponse : User) => {
          let userAuth = {
            email: user.email,
            password: user.password,
          };
          console.log(userAuth);
          this.signIn(userAuth);
          console.log('enregistrement terminé !');

          return true;
        },
        (error) => {
          console.log('erreur de sauvegarde !' + error);
        }
      );
      return false;
  }
  getUserAuth(userName: string): Observable<UserAuth> {
    const url = `${this.host}/${userName}`;
    return this.httpClient.get<UserAuth>(url);
  }
  getUser(email: string|null):Observable<User>{
    return this.httpClient.get<User>(`${this.host}/email/${email}`);
  }
//End  communication with dataBase


  logout() {
    this.isloggedIn = false;
    this.loggedUser = '';
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/welcome']);
  }
  signIn(user: UserAuth) {
    this.loggedUser = user.email;
    this.isloggedIn = true;

    localStorage.setItem('loggedUser', this.loggedUser);
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/sidebar']);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
  }



}
