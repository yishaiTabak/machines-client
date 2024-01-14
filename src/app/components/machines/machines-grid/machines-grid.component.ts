import { Component } from '@angular/core';
import { Machine } from '../../../models/machine.model';
import { MachinesService } from '../../../services/machines.service';
import { take } from 'rxjs';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DeleteDecisionModalComponent } from '../../delete-decision-modal/delete-decision-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MachineFormComponent } from '../machine-form/machine-form.component';
import { ManufacturersService } from '../../../services/manufacturers.service';
import { State } from '@progress/kendo-data-query';
import { UploadImageComponent } from '../../upload-image/upload-image.component';

@Component({
  selector: 'app-machines-grid',
  templateUrl: './machines-grid.component.html',
  styleUrl: './machines-grid.component.css'
})
export class MachinesGridComponent {
  constructor(private machinesService:MachinesService,private manufacturerService:ManufacturersService, public dialog: MatDialog){
    this.machinesService.resetState.subscribe(()=>{
      this.state = {
      skip: 0,
      take: 10,
      group: [],
      filter: { filters: [], logic: "and" },
      sort: [],
    }
      this.loadMachines(this.state)
    })
  }
  
  gridData: GridDataResult = {total:0, data:[]}
  sizes:number[] = [10,15,20]
  buttonCount = 3;
  loading = true
  manufacturerNames!:any

  ngOnInit(): void {
    this.manufacturerService.initManufacturers()
    this.manufacturerService.manufacturers.subscribe((manufacturers:any) =>{
      this.manufacturerNames = manufacturers.map((manufacturer:any)=>manufacturer.name)
    })

    this.machinesService.machinesData.subscribe((data:GridDataResult)=>{
      this.gridData = data
    })
  }

  onDelete(id:any): void {
    const dialogRef = this.dialog.open(DeleteDecisionModalComponent, {
    data:{id},
    disableClose:true,
    hasBackdrop:true
    });
  }

  onEdit(machineData:Machine){
    const dialogRef = this.dialog.open(MachineFormComponent, {
      data:{machineData},
      disableClose:true,
      hasBackdrop:true
      });
  }

  onImageClick(machineData:Machine){
    this.dialog.open(UploadImageComponent,{
      data:{machineId:machineData.id, imageUrl:machineData.imageUrl},
      disableClose:true,
      hasBackdrop:true
    })
  }

  public state!: State
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.loadMachines(state)
  }

  loadMachines(state:State){
    this.loading = true
    this.machinesService.setMachines(state).pipe(take(1)).subscribe(()=>{
      this.loading = false
    })
  }
}
