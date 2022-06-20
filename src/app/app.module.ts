import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from './material/material.module';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MainModule } from './main/main.module';

import localeEs from '@angular/common/locales/es-EC';
import { registerLocaleData } from '@angular/common';

const EC_LOCALE_ID = 'es-EC';
registerLocaleData(localeEs, EC_LOCALE_ID);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxSpinnerModule,
    MainModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: EC_LOCALE_ID,
    },
  ],
})
export class AppModule {}
