import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "./quiz/quiz.component";
import {TestComponent} from "./test/test.component";

export const routes: Routes = [
  {
    path: "quiz",
    component: QuizComponent,
    title: "Quiz - Quiz List"
  },
  {
    path: "test",
    component: TestComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
