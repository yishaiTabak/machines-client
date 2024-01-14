import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(private http:HttpClient) { }
  options = {
    headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('jwt')}`}),
  }

  getImage(machineId:number):Observable<any>{
    return this.http.get(`${environment.urlServer}/images/get/${machineId}`,
     this.options);
  }

  deleteImage(machineId:number):Observable<any>{
    return this.http.delete(`${environment.urlServer}/images/delete/${machineId}`,
    this.options);
  }

  updateImage(imageData:any,machineId:number):Observable<any>{
    return this.http.patch(environment.urlServer+'/images/update', 
    { imageData, machine_id:machineId },
    this.options)
  }
}
