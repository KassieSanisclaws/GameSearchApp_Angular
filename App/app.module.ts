import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the below is the angular gauge. //
import { GaugeModule } from 'angular-gauge';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the below is the angular material inports. //
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the below is the components imports. //
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DetailsComponent } from './components/details/details.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomepageComponent,
    DetailsComponent,
    GameTabsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GaugeModule.forRoot(), // this does the angular            //
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    HttpClientModule,


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true}, 
              { provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true},                ],
  bootstrap: [AppComponent]
})
export class AppModule { }
