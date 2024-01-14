import { Component, Inject } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { DeleteImageDecisionComponent } from '../delete-image-decision/delete-image-decision.component';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {
  constructor(public dialog: MatDialog, private imagesService:ImagesService, private dialogRef: MatDialogRef<UploadImageComponent>,@Inject(MAT_DIALOG_DATA) public data:{machineId:number, imageUrl:string}){}
  errorMessage:string = ''
  selectedFile: File | null = null;

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onDeleteImage(){
    const dialogRef = this.dialog.open(DeleteImageDecisionComponent, {
      data:{id:this.data.machineId, afterDelete:()=>this.dialogRef.close()},
      disableClose:true,
      hasBackdrop:true
      });
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      return
    }

    if(!this.isValidImageType(this.selectedFile)){
      this.dialog.open(MessageModalComponent, {
        data:{message:this.errorMessage},
        hasBackdrop:true,
        });
      return
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const imageData = (e.target as any).result.split(',')[1]; // Get base64 image data
      
      this.updateImage(imageData)
    };

    reader.readAsDataURL(this.selectedFile);
    this.dialogRef.close()
  }

  updateImage (imageData:string){
    this.imagesService.updateImage(imageData,this.data.machineId).pipe(take(1)).subscribe(
      (response: any) => {
        this.dialog.open(MessageModalComponent, {
          data:{message:`image ${this.data.imageUrl?'changed':'uploaded'} successfully`},
          hasBackdrop:true,
          });
      },
      (error:any) => {
        console.error(error);
      }
    );
  }

  private isValidImageType(selectedFile:any): boolean {
    
    this.errorMessage = ''
    const maxSizeInBytes = 5 * 1024 * 1024; 
    if (selectedFile.size > maxSizeInBytes) {
        this.errorMessage = 'File size exceeds the maximum allowed size.'
        return false
    }
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    if(!allowedImageTypes.includes(selectedFile.type)) {
      this.errorMessage = "Invalid file type. Please select an image file."
      return false
    }
    return true
  }

  onClose(){
    this.dialogRef.close()
  }
}
