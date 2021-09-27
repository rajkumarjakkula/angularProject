import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceGuard implements CanActivate {
  constructor(private taskService:TaskService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.taskService.isTokenExpired()){
        this.router.navigate(['/sig'])
        return false;
      }else{
        return true;
      }
      }
  
}
