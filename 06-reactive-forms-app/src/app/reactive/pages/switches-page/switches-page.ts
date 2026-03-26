import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { FormError } from '../../../shared/components/form-error/form-error';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule, FormError],
  templateUrl: './switches-page.html',
})
export class SwitchesPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
