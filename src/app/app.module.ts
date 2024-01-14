import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MachinesComponent } from './components/machines/machines.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FilterModule } from '@progress/kendo-angular-filter';
import { DropDownsModule, FilterableComponent } from '@progress/kendo-angular-dropdowns';
import { DropDownListFilterComponent } from './components/dropdownlist-filter/dropdownlist-filter.component';
import { InputsModule } from "@progress/kendo-angular-inputs";
import { DeleteDecisionModalComponent } from './components/delete-decision-modal/delete-decision-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MachineFormComponent } from './components/machines/machine-form/machine-form.component';
import { DateTimePickerModule } from '@progress/kendo-angular-dateinputs';
import { MachinesGridComponent } from './components/machines/machines-grid/machines-grid.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { DeleteImageDecisionComponent } from './components/delete-image-decision/delete-image-decision.component';
import { MachinesListComponent } from './components/machines/machines-list/machines-list.component';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { ListItemComponent } from './components/machines/list-item/list-item.component';
import { LayoutModule } from '@progress/kendo-angular-layout';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MachinesComponent,
    HeaderComponent ,
    DropDownListFilterComponent,
    DeleteDecisionModalComponent,
    MachineFormComponent,
    MachinesGridComponent,
    MessageModalComponent,
    UploadImageComponent,
    DeleteImageDecisionComponent,
    MachinesListComponent,
    ListItemComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // FilterModule,
    DropDownsModule,
    DropDownListModule,
    // InputsModule,
    DateTimePickerModule,
    ToolBarModule,
    ListViewModule,
    // LayoutModule
  
  ],
  providers: [FilterableComponent,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
