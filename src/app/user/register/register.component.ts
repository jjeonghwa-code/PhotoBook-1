import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import {
  CommonService,
  AppStateService,
  FilesService,
  UserService
} from '../../shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Language() lang: string;
  loginForm: FormGroup;
  loginFormErrors: any;
  loginErrorMessage: string;
  newsletter: boolean;

  constructor(
    private _notifications: NotificationsService,
    private commonService: CommonService,
    private appStateService: AppStateService,
    private fileService: FilesService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public locale: LocaleService
  ) { }

  ngOnInit() {
    this.loginFormErrors = {
      firstName: {},
      lastName: {},
      email: {},
      emailRepeat: {},
      password: {},
      passwordRepeat: {}
    };

    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailRepeat: ['', [Validators.required, Validators.email, confirmEmail]],
      password: ['', Validators.required],
      passwordRepeat: ['', [Validators.required, confirmPassword]],
    });

    this.formValuesChanged();
    this.loginForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });
  }

  formValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (this.loginFormErrors.hasOwnProperty(field)) {
        this.loginFormErrors[field] = {};

        const control = this.loginForm.get(field);

        if (control && control.dirty && !control.valid) {
          this.loginFormErrors[field] = control.errors;
        }
      }
    }
  }

  login() {
    const credentials = { 
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.userService.login(credentials)
      .subscribe((res) => {
        if (parseInt(res.errNum) == 200) {
          this.appStateService.userInfo = res;
          this.fileService.user = res;
          return this.router.navigate(['get-started']);
        }

        this._notifications.error(res.errMsg, null, {
          clickToClose: true,
          timeOut: 2000
        });
      },(err) => {
          this._notifications.error('Wrong password or email!', null, {
            clickToClose: true,
            timeOut: 2000
          });         
        }
      );
  }

  register() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const credentials = { 
      device: '3', // Device type is 3 for web.
      firstName: this.loginForm.get('firstName').value,
      lastName: this.loginForm.get('lastName').value,
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
      pushToken: '',
      profilePic: '',
      // profilePic: (vm.avatar != "public/images/profile_picture_default.jpg") ? vm.avatar.split(',')[1] : '',
      language: this.locale.getCurrentLanguage(),
      newsletter: this.newsletter ? 1 : 0,
    };
    this.userService.register(credentials)
      .subscribe((res) => {
        if (parseInt(res.errNum) == 200) {
          this.login();
        }

        this._notifications.error(res.errMsg, null, {
          clickToClose: true,
          timeOut: 2000
        });
      },(err) => {
          this._notifications.error('Something went wrong!', null, {
            clickToClose: true,
            timeOut: 2000
          });         
        }
      );
  }

  get loginSubTitle2(): string {
    return this.commonService.translateTemplate('REGISTER_FORM_SUBTITLE_P2', {});
  }
}

function confirmPassword(control: AbstractControl)
{
  if ( !control.parent || !control )
  {
    return;
  }

  const password = control.parent.get('password');
  const passwordRepeat = control.parent.get('passwordRepeat');

  if ( !password || !passwordRepeat )
  {
    return;
  }

  if ( passwordRepeat.value === '' )
  {
    return;
  }

  if ( password.value !== passwordRepeat.value )
  {
    return {
      passwordsNotMatch: true
    };
  }
}

function confirmEmail(control: AbstractControl)
{
  if ( !control.parent || !control )
  {
    return;
  }

  const email = control.parent.get('email');
  const emailRepeat = control.parent.get('emailRepeat');

  if ( !email || !emailRepeat )
  {
    return;
  }

  if ( emailRepeat.value === '' )
  {
    return;
  }

  if ( email.value !== emailRepeat.value )
  {
    return {
      emailsNotMatch: true
    };
  }
}