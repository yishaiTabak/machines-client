import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {
  private _manufacturers = new BehaviorSubject([])
  manufacturers = this._manufacturers.asObservable()
  options = {
    headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('jwt')}`}),
  }
  constructor(private http:HttpClient) { }
  private getManufacturers():Observable<any[]>{
    return this.http.get<any[]>(
      environment.urlServer+'/manufacturers/get',
      this.options
    )
  }
  initManufacturers(){
  this.getManufacturers().pipe(take(1)).subscribe((manufacturers:any) =>{
    this._manufacturers.next(manufacturers)
  })
  }
}
