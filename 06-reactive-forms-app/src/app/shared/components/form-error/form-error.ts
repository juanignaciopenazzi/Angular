import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-form-error',
  imports: [],
  templateUrl: './form-error.html',
})
export class FormError {

  formUtils = FormUtils;

  form = input.required<FormGroup>();
  fieldName = input.required<string>();
}
