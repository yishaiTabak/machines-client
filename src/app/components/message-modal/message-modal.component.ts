import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MachinesService } from '../../services/machines.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.css'
})
export class MessageModalComponent {
  constructor(private machineService:MachinesService, private dialogRef: MatDialogRef<MessageModalComponent>,@Inject(MAT_DIALOG_DATA) public data:{message:string}) { }

  close():void{
    this.machineService.refresh()
    this.dialogRef.close()
  }
}
