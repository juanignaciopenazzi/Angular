import { Component, input } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-array-error',
  imports: [],
  templateUrl: './form-array-error.html',
})
export class FormArrayError {
  formUtils = FormUtils;

  formArray = input.required<FormArray>();
  index = input.required<number>();
}
