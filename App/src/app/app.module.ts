import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogsComponent } from './logs/logs.component';
import { TestComponent } from './test/test.component';
import { HeaderComponent } from './components/header/header.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
    TestComponent,
    HeaderComponent,
    QuestionCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
