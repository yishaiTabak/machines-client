import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, EMPTY, Observable, map, switchMap, take, tap } from 'rxjs';
import { RequestFilter } from '../models/requestFilter.model';
import { Machine } from '../models/machine.model';
import { ImagesService } from './images.service';
import { CaseConverterService } from './case-converter.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {
  options = {
    headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('jwt')}`}),
  }
  private _machinesData = new BehaviorSubject<GridDataResult>({data:[], total:0})
  machinesData = this._machinesData.asObservable()
  private _resetState = new BehaviorSubject<any>(null)
  resetState = this._resetState.asObservable()
  constructor(private caseConverterService:CaseConverterService,private http:HttpClient,private imagesService:ImagesService) { }

  refresh(){
    this._resetState.next(null)
  }
  
  setMachines(state:State):Observable<void>{
    const filterData:RequestFilter =  this.createFilterData(state)
    return this.getMachines(filterData).pipe(map((data)=>{
      this._machinesData.next(data)
      })
    )
  }

  createFilterData(state:State):RequestFilter{  
    const filterData:RequestFilter = {
      skip:state.skip!,
      limit:state.take!,
      sortBy:'id',
      isAsc:true,
      searchedId:null,
      searchedName:null,
      filterManufacturer:null,
      filterStatus:null
    }
    if(state.sort &&state.sort.length>0 && state.sort![0].dir){
      filterData.sortBy = state.sort![0].field
      filterData.isAsc = state.sort![0].dir === 'asc'
    }

    if(state.filter?.filters){
      this.addFiltersToRequest(filterData,state.filter.filters)
    }
    return filterData
  }

  addFiltersToRequest(filterData:RequestFilter,filters:any){
    for(let filter of filters){
        
      if ('field' in filter && 'value' in filter) {
        switch (filter.field) {
          case 'id':
            filterData.searchedId = filter.value;
            break;
          case 'name':
            filterData.searchedName = filter.value;
            break;
          case 'manufacturerName':
            filterData.filterManufacturer = [filter.value];
            break;
          case 'status':
            filterData.filterStatus = filter.value;
            break;
        }
      }
    }
  }

  getMachines(filterData:RequestFilter|{} = {}):Observable<GridDataResult>{
    const filterDataSnakeFormat = this.caseConverterService.camelToSnakeObj(filterData)
    filterDataSnakeFormat.sort_by = this.caseConverterService.camelToSnakeString(filterDataSnakeFormat.sort_by)
    return this.http.post<GridDataResult>(
      environment.urlServer + '/machines/get',
      filterDataSnakeFormat,
      this.options
    ).pipe(
      map((response: GridDataResult) => {        
        response.data = this.caseConverterService.snakeToCamelArrayOfObj(response.data) 
        response.data = this.convertMachinesToTypes(response.data)
        this.addImageUrlsToMachines(response.data)       
        return response
      })
    );
  }

  addImageUrlsToMachines(machines:Machine[]){
    for(let machine of machines){
      this.imagesService.getImage(machine.id).pipe(take(1)).subscribe(
        (response:any) => {
          if(response.image)
            machine.imageUrl = 'data:image/png;base64,' + response.image;
        },
        (error) => {
          console.error('Error fetching image:', error);
        }
      )
    }
  }

  convertMachinesToTypes(machines:any):Machine[]{
    return machines.map((machine: any) => ({
      id: Number(machine.id),
      name: machine.name,
      manufacturerName: machine.manufacturerName,
      purchasedAt: new Date(machine.purchasedAt),
      manufactureYear: Number(machine.manufactureYear),
      status: Boolean(machine.status),
      capacity: Number(machine.capacity)
    }));
  }

  deleteMachine(id:number){
    return this.http.delete(
      `${environment.urlServer}/machines/delete/${id}`,
      this.options
    )
  }
  addMachine(machineData:any){
    const machineDataSnakeFormat = this.caseConverterService.camelToSnakeObj(machineData)
    console.log(machineDataSnakeFormat);
    
    return this.http.post(
      environment.urlServer +'/machines/add',
      machineDataSnakeFormat,
      this.options
    )
  }
  updateMachine(id:number, machineData:any){
    const machineDataSnakeFormat = this.caseConverterService.camelToSnakeObj(machineData)
    console.log(id);
    
    return this.http.patch(
      `${environment.urlServer}/machines/update/${id}`,
      machineDataSnakeFormat,
      this.options 
    )
  }
}
