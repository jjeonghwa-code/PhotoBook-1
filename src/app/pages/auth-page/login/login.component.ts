import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@photobook/core/services/user.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userSerivce: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.isLoading = true;
    this.userSerivce.login(this.loginForm.value)
      .pipe(
        tap((x: any) => {
          if (parseInt(x.errNum, 10) === 200) {
            this.router.navigate(['/magazine/create/step1']);
          } else {
            // TODO: error
            console.log(x);
          }
        }),
        catchError((e) => of('Login failed')),
        finalize(() => this.isLoading = false)
      )
      .subscribe(message => {
        // nothing
      });
  }

}
