import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog  } from '@angular/material/dialog';
import { MachinesService } from '../../services/machines.service';
import { take } from 'rxjs';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
  selector: 'app-delete-decision-modal',
  templateUrl: './delete-decision-modal.component.html',
  styleUrl: './delete-decision-modal.component.css'
})
export class DeleteDecisionModalComponent {
  constructor(public dialog: MatDialog,private machinesService: MachinesService, private dialogRef: MatDialogRef<DeleteDecisionModalComponent>,@Inject(MAT_DIALOG_DATA) public data:{id:number}) { }

  dontDelete():void{
    this.dialogRef.close()
  }

  onDelete(): void {
    this.machinesService.deleteMachine(this.data.id).pipe(take(1)).subscribe(()=>{
      this.dialog.open(MessageModalComponent, {
        data:{message: `the machine deleted successfully`},
        hasBackdrop:true
      });
      this.dialogRef.close();
    })
  }
}
