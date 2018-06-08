import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@photobook/core/services/user.service';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailRepeat: ['', [Validators.required, Validators.email]], // TODO: check original code for the validation
      password: ['', Validators.required],
      passwordRepeat: ['', [Validators.required]], // TODO: check original code for the validation
    });
  }

  register() {
    this.isLoading = true;
    const credentials = {
      email: this.registerForm.get('email').value,
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      password: this.registerForm.get('password').value,
      pushToken: '',
      profilePic: '',
      device: '3',
      newsletter: 0, // TODO: resolve newsletter
      language: '' // TODO: get from local serivce
    };
    this.registerAndLogin(credentials)
      .pipe(
        tap(x => {
          this.router.navigate(['/magazine/create/step1']);
        }),
        catchError(e => of(e)),
        finalize(() => this.isLoading = false)
      )
      .subscribe(event => {
        // nothing
      });
  }

  private registerAndLogin(credentials) {
    return this.userService.register(credentials)
      .pipe(switchMap(x => this.userService.login({email: credentials.email, password: credentials.password})));
  }

}
