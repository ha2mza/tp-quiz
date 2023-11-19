import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import env from "../../../env/env";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  error: any = "";
  constructor(private http: HttpClient, private router: Router) {
  }

  loader: any = {
    login: false
  }


  formLogin: any = {
    CNE: "",
    password: "",
  }


  login() {
    this.loader.login = true;

    this.http.post(`${env.api_url}/auth/login`, this.formLogin).subscribe({
      next: (value: any) => {
        this.loader.login = false;

        localStorage.setItem("access_token", value.access_token)
        this.router.navigateByUrl("/quiz");
      },
      error: err => {
        this.loader.login = false;
        this.error = "Failed to login reload please!!"
      }

    });

  }
}
