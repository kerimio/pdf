import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pdfSrc: string = ''; // Hier initialisieren Sie pdfSrc mit einem leeren String

  updatePdf(formData: any) {
    this.pdfSrc = formData.pdfSrc; // Setzen Sie pdfSrc mit dem Wert aus dem Formular
  }
}
