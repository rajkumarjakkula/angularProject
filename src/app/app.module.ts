import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule,} from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { ComponentsComponent } from './components/components.component';
import { ButtonComponent } from './comps/button/button.component';
import { HeaderComponent } from './comps/header/header.component';
import { TasksComponent } from './comps/tasks/tasks.component';
import { TaskItemComponent } from './comps/task-item/task-item.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    ButtonComponent,
    HeaderComponent,
    TasksComponent,
    TaskItemComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
	ToastrModule.forRoot()   
  ],
  providers: [],
  bootstrap: [AppComponent]
  //bootstrap:[ComponentsComponent]
})
export class AppModule {

}
