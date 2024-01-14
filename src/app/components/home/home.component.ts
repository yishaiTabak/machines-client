import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor (private loginService:LoginService){}
  userFullName!:string|null 
  ngOnInit(): void {
    this.loginService.userFullName.pipe(take(1)).subscribe((userFullName) =>{
      this.userFullName = userFullName
    }) 
  }
}
