import { FormGroup } from "@angular/forms";

export const composeInvalidNameMessage = (machineForm:FormGroup): string=> {
    const errors: any = machineForm?.get('name')!.errors;

    if (errors?.required) {
      return 'you must enter machine name';
    }
    if(errors?.minlength){
      return 'machine name must contain at least 2 characters'
    }
    return '';
  }

 export const composeInvalidPurchaseDateMessage = (machineForm:FormGroup): string=> {
    const errors: any = machineForm?.get('purchasedAt')!.errors;

    if (errors?.required) {
      return 'you must enter purchase date';
    }
    if(machineForm.errors?.['invalidDate'])
      return 'purchase time cannot be before manufacture'
    return '';
  }
  export const composeInvalidManufactureYearMessage = (machineForm:FormGroup): string=> {
    const errors: any = machineForm?.get('manufactureYear')!.errors;

    if (errors?.required) {
      return 'you must enter manufacture year';
    }
    if(errors?.min || errors.max){
      return 'manufacture year had to be from 1900 to current year'
    }
    if(errors?.notInteger){
      return 'has to be integer'
    }
    return '';
  }
export const composeInvalidCapacityMessage = (machineForm:FormGroup): string=> {
    const errors: any = machineForm?.get('capacity')!.errors;

    if (errors?.required || errors?.min || errors?.max) {
      return 'you must enter valid capacity';
    }
    if(errors?.notInteger){
      return 'has to be integer'
    }
    return '';
  }