import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService,
    private route:Router){}
canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean  {
    if(localStorage.getItem('isloggedIn') == "false"){
        return true;
    } else {
        this.route.navigate(['/sidebar']);
        return false;
    }
}
}
