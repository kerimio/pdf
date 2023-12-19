// src/app/pdf.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormData } from './form-data.model'; // Assuming you have this model defined

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private formDataSubject = new BehaviorSubject<FormData | null>(null);
  formData$ = this.formDataSubject.asObservable();

  constructor() {}

  updateFormData(formData: FormData) {
    this.formDataSubject.next(formData);
  }
}
