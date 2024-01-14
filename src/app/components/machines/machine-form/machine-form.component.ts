import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MachinesService } from '../../../services/machines.service';
import { ManufacturersService } from '../../../services/manufacturers.service';
import { integerValidator, manufactureBeforePurchaseValidator } from './validators';
import { MessageModalComponent } from '../../message-modal/message-modal.component';
import { composeInvalidCapacityMessage, composeInvalidManufactureYearMessage, composeInvalidNameMessage, composeInvalidPurchaseDateMessage } from './invalidMessages';

@Component({
  selector: 'app-machine-form',
  templateUrl: './machine-form.component.html',
  styleUrl: './machine-form.component.css',
})
export class MachineFormComponent  {
  constructor(
    private machinesService: MachinesService,
    private manufacturersService:ManufacturersService,
    private dialogRef: MatDialogRef<MachineFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { machineData:any|undefined },
    public dialog: MatDialog
  ) {}
  // @Input() machineData: Machine | undefined;

  manufacturers!:any
  machineForm!: FormGroup;
  manufacturerId:number|undefined

  ngOnInit(): void {
    this.manufacturersService.manufacturers.subscribe((manufacturers:any) =>{
      this.manufacturers = manufacturers
      if(this.data.machineData)
        this.manufacturerId = this.findCurrentManufacturerId()
    })

    this.machineForm = new FormGroup({
      name: new FormControl(this.data.machineData?.name, [
        Validators.required,
        Validators.minLength(2),
      ]),
      manufacturerId: new FormControl(this.manufacturerId || this.manufacturers[0].id,  [
        Validators.required,
      ]),
      purchasedAt: new FormControl(this.data.machineData?.purchasedAt || new Date(), [
        Validators.required,
      ]),
      manufactureYear: new FormControl(this.data.machineData?.manufactureYear, [
        Validators.required,
        Validators.min(1900),
        Validators.max(2024),
        integerValidator
      ]),
      status: new FormControl(this.data.machineData?.status||false),
      capacity: new FormControl(this.data.machineData?.capacity*100, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
        integerValidator
      ]),
    },{
      validators: [manufactureBeforePurchaseValidator]
    });
  }

  invalidNameMessage(): string {
    return composeInvalidNameMessage(this.machineForm)
  }

  invalidPurchaseDateMessage(): string {
    return composeInvalidPurchaseDateMessage(this.machineForm)
  }
  invalidManufactureYearMessage(): string {
    return composeInvalidManufactureYearMessage(this.machineForm)
  }
  invalidCapacityMessage(): string {
    return composeInvalidCapacityMessage(this.machineForm)
  }

  findCurrentManufacturerId(){
    const manufacturer = this.manufacturers.find((manufacturer:any) => 
    manufacturer.name === this.data.machineData.manufacturerName)
    return manufacturer.id
  }

  createUpdatesObj(){
  const updates:any = {}
  Object.keys(this.machineForm.value).forEach((key:string)=>{
    if(key === 'manufacturerId') {
      if(this.machineForm.value[key] !== this.manufacturerId)
        updates[key] = this.machineForm.value[key]
    }

    else if(this.machineForm.value[key] !== this.data.machineData[key]){
      updates[key] = this.machineForm.value[key]
    }
  })
  return updates
  }

  onSubmit() {
    this.machineForm.value.capacity /= 100
    
    if(this.data.machineData){      
      const updates = this.createUpdatesObj()
      if(Object.keys(updates).length === 0){
        return
      }
      this.machinesService.updateMachine(this.data.machineData!.id,updates).
      subscribe(()=>{
        this.dialog.open(MessageModalComponent, {
          data:{message: `the machine updated successfully`},
          hasBackdrop:true
        });
      })
    } else{
      this.machinesService.addMachine(this.machineForm.value).subscribe(()=>{
        this.dialog.open(MessageModalComponent, {
          data:{message: `machine added successfully`},
          hasBackdrop:true
        });
      })
    }  
    this.dialogRef.close()
  }

  close(){
    this.dialogRef.close()
  }
}
