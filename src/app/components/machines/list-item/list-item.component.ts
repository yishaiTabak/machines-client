import { Component, Input } from '@angular/core';
import { Machine } from '../../../models/machine.model';
import { MatDialog } from '@angular/material/dialog';
import { MachineFormComponent } from '../machine-form/machine-form.component';
import { UploadImageComponent } from '../../upload-image/upload-image.component';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  @Input() machineData!: Machine

  constructor(private dialog:MatDialog){}

  onEdit(){
    const dialogRef = this.dialog.open(MachineFormComponent, {
      data:{machineData:this.machineData},
      disableClose:true,
      hasBackdrop:true
      });
  }

  onImageClick(){
    this.dialog.open(UploadImageComponent,{
      data:{machineId:this.machineData.id, imageUrl:this.machineData.imageUrl},
      disableClose:true,
      hasBackdrop:true
    })
  }
}
