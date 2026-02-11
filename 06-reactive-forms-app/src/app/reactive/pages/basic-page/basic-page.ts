import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormError } from "../../../shared/components/form-error/form-error";

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule, FormError],
  templateUrl: './basic-page.html',
})
export class BasicPage {
  private formBuilder = inject(FormBuilder);

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  // myForm2 = new FormGroup({
  //   name: new FormControl('',
  //        [] /** Validadores Síncronos */,
  //        [] /** Validadores Asíncronos */),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // });


  // isValidField( fieldName: string ): boolean | null {
  //   return  (
  //     this.myForm.controls[fieldName].errors &&
  //     this.myForm.controls[fieldName].touched);
  // }

  // getFieldError( fieldName: string ): string | null {
  //   if ( !this.myForm.controls[fieldName] ) return null;

  //   const errors = this.myForm.controls[fieldName].errors ?? {};

  //   for ( const key of Object.keys(errors) ) {
  //     switch(key) {
  //       case 'required':
  //         return 'Este campo es requerido';

  //       case 'minlength':
  //         return `Mínimo de ${ errors['minlength'].requiredLength } caracteres`;

  //       case 'min':
  //         return `Valor mínimo de ${ errors['min'].min }`;
  //     }
  //   }
  //   return null;
  // }


  onSave() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset({
      name: '',
      price: 0,
      inStorage: 0
    })
  }

}
