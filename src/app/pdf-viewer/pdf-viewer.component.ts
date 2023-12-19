import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PDFDocument } from 'pdf-lib';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfService } from '../pdf.service'; // Import the PDF service
import { FormData } from '../form-data.model'; // This should be the model you have defined

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  pdfSrc: SafeResourceUrl;
  pdfDoc: PDFDocument | null = null;
  lastFormData: FormData | null = null; // Fügen Sie diese Zeile hinzu


  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private pdfService: PdfService // Inject the PDF service
  ) {
    // Initialize with an empty SafeResourceUrl
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit() {
    this.pdfService.formData$.subscribe(async (formData: FormData | null) => {
      if (formData) {
        this.lastFormData = formData; // Speichern Sie die Daten
        await this.updatePdfData(formData);
      } else {
        // Handle the case where formData is null if needed
      }
    });
  
    this.loadInitialPdf();
  }

  private async loadInitialPdf() {
    try {
      const pdfBytes = await this.http.get('assets/OoPdfFormExample.pdf', { responseType: 'arraybuffer' }).toPromise();
      if (pdfBytes) {
        this.pdfDoc = await PDFDocument.load(pdfBytes);
        // After loading the initial PDF, create a blob URL and set it as pdfSrc
        const pdfData = await this.pdfDoc.save();
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(pdfBlob);
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      } else {
        console.error('PDF bytes are undefined.');
      }
    } catch (error) {
      console.error('Error loading PDF file:', error);
    }
  }

  async updatePdfData(formData: FormData) {
    if (!this.pdfDoc || !formData) {
      console.error('PDF-Dokument ist nicht geladen oder formData ist null.');
      return;
    }
  
    // Update the PDF with form data
    this.pdfDoc.getForm().getTextField('Given Name Text Box').setText(formData.name);
    this.pdfDoc.getForm().getTextField('Family Name Text Box').setText(formData.birthdate);
  
    // Save the updated PDF and create a blob
    const pdfData = await this.pdfDoc.save();
    this.triggerDownload(pdfData);
  }
  
  triggerDownloadButtonClicked() {
    if (!this.pdfDoc || !this.lastFormData) {
      alert('Die PDF-Daten sind noch nicht fertig oder das Formular wurde noch nicht abgesendet.');
      return;
    }
  
    // Da lastFormData nicht null ist, können Sie es direkt verwenden.
    this.updatePdfData(this.lastFormData);
  }
  

  triggerDownload(pdfData: Uint8Array) {
    // Erstellen Sie eine neue Blob-Instanz, die die PDF-Daten enthält
    const blob = new Blob([pdfData], { type: 'application/pdf' });
  
    // Erstellen Sie eine URL für den Blob
    const blobUrl = URL.createObjectURL(blob);
  
    // Erstellen Sie ein temporäres a-Element zum Auslösen des Downloads
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = 'updated-form.pdf';
  
    // Fügen Sie das Element zum DOM hinzu, lösen Sie den Download aus und entfernen Sie es dann
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  
    // Optional: Löschen Sie die Blob-URL, wenn sie nicht mehr benötigt wird
    URL.revokeObjectURL(blobUrl);
  }

}
