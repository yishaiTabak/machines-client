import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class LoginService{
    private _userFullName = new BehaviorSubject<string|null>(localStorage.getItem('userFullName'))
    userFullName = this._userFullName.asObservable()
    private _isLoginSubject = new BehaviorSubject<boolean>(this._userFullName.getValue() != null)
    isLoginObservable = this._isLoginSubject.asObservable()
    private _isUnsuccessfullLogin = new BehaviorSubject<boolean>(false)
    isUnsuccessfullLogin = this._isUnsuccessfullLogin.asObservable()

    constructor(private http:HttpClient, private router:Router){}


    private setUserFullName(name:string|null){
        this._userFullName.next(name)
        this._isLoginSubject.next(name != null)
    }


    login(username:string, password:string){
        this.http.post(
          environment.urlServer+'/auth/login',
          {username,password},
          {headers: new HttpHeaders({'Content-Type': 'application/json'})}
      ).subscribe((res:any)=>{
          
            localStorage.setItem('jwt', res.token);
            localStorage.setItem('userFullName', res.username)
          
          this.setUserFullName(res.username)
          this.router.navigate(['/home'])
      },
      (error) => {
        this._isUnsuccessfullLogin.next(true)
        console.error('unable to login')
      })
    }

    logout(){        
        localStorage.removeItem('jwt');
        localStorage.removeItem('userFullName')
        this.setUserFullName(null)
        this.router.navigate(['/login'])
    }

}