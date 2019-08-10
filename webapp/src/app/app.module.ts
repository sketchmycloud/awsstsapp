import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StsService } from './sts.service';
import { StsComponent } from './sts/sts.component';

@NgModule({
  declarations: [
    AppComponent,
    StsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [StsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
