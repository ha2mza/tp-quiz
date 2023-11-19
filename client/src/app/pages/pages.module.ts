import { NgModule } from '@angular/core';
import {PagesRoutingModule} from "./pages-routing.module";
import {QuizComponent} from "./quiz/quiz.component";
import {TestComponent} from "./test/test.component";



@NgModule({
  declarations: [QuizComponent, TestComponent],
  imports: [
    PagesRoutingModule
  ]
})
export class PagesModule { }
