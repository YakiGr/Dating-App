import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private accountService: AccountService,private toaster: ToastrService, private router: Router){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    return this.accountService.currentUser$.pipe(
        map(user => {
            if(user) return true;
            this.toaster.error('You shall not pass! U have may to login or registr ');
             this.router.navigateByUrl('/login');
        })
    )
  }
  
}
