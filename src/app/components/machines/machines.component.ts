import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MachineFormComponent } from './machine-form/machine-form.component';
import { MachinesService } from '../../services/machines.service';


@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css'
})
export class MachinesComponent {
  isGrid:boolean = true
  constructor(private machineService:MachinesService, public dialog: MatDialog){}
  onAddMachine(){
    const dialogRef = this.dialog.open(MachineFormComponent, {
      data:{},
      hasBackdrop:true,
      disableClose:true
      });
  }

  onRefresh(){
    this.machineService.refresh()
  }

  onToggle(event:any){
    this.isGrid = event    
  }
}
