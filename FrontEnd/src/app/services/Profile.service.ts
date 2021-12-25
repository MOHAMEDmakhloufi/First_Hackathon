import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    public host = environment.authBaseUrl + "/api/user";

    users!: User[];
    constructor(private httpClient: HttpClient,
        private authService: AuthService,
        private router: Router) { }

    // communication with dataBase
    getAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.host);
    }
    updateUser(user: User): boolean {
        const url = `${this.host}/${user.email}`;
        this.httpClient.put<User>(url, user)
            .subscribe(
                (reponse: User) => {
                    console.log(reponse);
                    console.log('update finish !');
                    return true;
                },
                (error) => {
                    console.log('errer with update !' + error);
                }
            );
            return false
    }
    deleteUser(email: String|null) {
        console.log(email);
        const url = `${this.host}/${email}`;
        this.httpClient.delete<User>(url)
            .subscribe(
                (User: User) => {
                    console.log(User);
                    console.log('delete finish !');
                    this.authService.logout();
                },
                (error) => {
                    console.log('errer with delete !' + error);
                }
            );
    }
    getUserById(id: number): Observable<User> {
        const url = `${this.host}/id/${id}`;
        return this.httpClient.get<User>(url);
      }
    //End  communication with dataBase



}