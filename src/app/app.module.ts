import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule, 
		HttpClientModule, 
		FormsModule
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
