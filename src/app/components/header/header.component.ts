import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.loginService.userFullName.subscribe((userFullName)=>{
      this.userFullName = userFullName
    } )
  }
  constructor(private loginService:LoginService){}
  userFullName!:string|null

  onLogout(){
    this.loginService.logout()
  }
}
