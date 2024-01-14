import { Component, Inject } from '@angular/core';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-delete-image-decision',
  templateUrl: './delete-image-decision.component.html',
  styleUrl: './delete-image-decision.component.css'
})
export class DeleteImageDecisionComponent {
  constructor(public dialog: MatDialog,private imagesService:ImagesService, private dialogRef: MatDialogRef<DeleteImageDecisionComponent>,@Inject(MAT_DIALOG_DATA) public data:{id:number, afterDelete:any}) { }

  dontDelete():void{
    this.dialogRef.close()
  }

  onDelete(): void {
    this.imagesService.deleteImage(this.data.id).pipe(take(1)).subscribe(()=>{
      this.dialog.open(MessageModalComponent, {
        data:{message: `the image deleted successfully`},
        hasBackdrop:true
      });
      this.dialogRef.close();
      this.data.afterDelete()
    })
  }
}
