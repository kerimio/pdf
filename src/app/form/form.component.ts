import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PdfService } from '../pdf.service'; // Ensure this path is correct based on your project structure
import { FormData } from '../form-data.model'; // This should be the model you have defined

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pdfService: PdfService // Inject the PdfService
  ) {
    this.myForm = this.formBuilder.group({
      name: [''],
      birthdate: ['']
      // pdfSrc field is removed since it's not needed for the form submission
    });
  }

  onSubmit() {
    const formData: FormData = this.myForm.value; // Cast the form value to FormData type
    this.pdfService.updateFormData(formData); // Use the PdfService to emit the form data
    this.myForm.reset(); // Reset the form after submission
  }
}
