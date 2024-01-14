import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

// Custom validator for integer values
export function integerValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  // Check if the value is an integer
  if (!Number.isInteger(value)) {
    return { notInteger: true };
  }

  return null;
}

export function manufactureBeforePurchaseValidator(form:any):ValidationErrors|null{    
    const purchaseDate = form.get('purchasedAt').value
    const manufactureYear = form.get('manufactureYear').value
    
    return purchaseDate.getFullYear() < manufactureYear? {invalidDate: true}:null
  }