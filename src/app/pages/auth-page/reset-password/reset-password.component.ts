import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@photobook/core/services/user.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  isLoading = false;
  resetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  reset() {
    this.isLoading = true;
    this.userService.resetPassword(this.resetForm.value)
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            this.router.navigate(['/login']);
          } else {
            // TODO: error
            console.log(res);
          }
        }),
        catchError(e => of(e)),
        finalize(() => this.isLoading = false)
      )
      .subscribe(event => {
        // nothing
      });
  }

}
