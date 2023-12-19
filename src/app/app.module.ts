import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import für HttpClientModule hinzugefügt
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PdfViewerComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule // HttpClientModule hinzugefügt
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
