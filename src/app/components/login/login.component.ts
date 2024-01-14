import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.loginService.isUnsuccessfullLogin.pipe(take(2)).subscribe(
      (isUnsuccessfullLogin) => this.isUnsuccessfullLogin = isUnsuccessfullLogin)
  }

  constructor(private loginService:LoginService){}

  isUnsuccessfullLogin:boolean = false


   async onSubmit(form:any){

    const username:string = form.form.value.username
    const password:string = form.form.value.password
    
    this.loginService.login(username,password)
  }
}
