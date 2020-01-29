import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CharacterSorterComponent } from './character-sorter/character-sorter.component';
import { CharacterListDisplayComponent } from './character-list-display/character-list-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSorterComponent,
    CharacterListDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
