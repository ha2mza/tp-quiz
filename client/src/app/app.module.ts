import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {AuthComponent} from "./layouts/auth/auth.component";
import {MainComponent} from "./layouts/main/main.component";



@NgModule({
  declarations: [AppComponent, AuthComponent, MainComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
