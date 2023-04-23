import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidator } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
  constructor(
    private firebaseSvr: FirebaseService,
    private utilSvc: UtilsService
  ) {}

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidator.matchValues(this.form.controls.password),
    ]);
    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  submit() {
    if (this.form.valid) {
      this.utilSvc.presentLoading({ message: 'Registrando...' });
      this.firebaseSvr
        .signUp(this.form.value as User)
        .then(async (res) => {
          console.log(res);
          await this.firebaseSvr.upDateUser({
            displayName: this.form.value.name,
          });

          let user: User = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          };

          this.utilSvc.setElementLocalstorage('user', user);
          this.utilSvc.routerLink('/tabs');

          this.utilSvc.dismissLoading();
          this.utilSvc.presentToast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 2000,
            color: 'primary',
            icon: 'person-outline',
          });
          this.form.reset();
        })
        .catch((error) => {
          console.log(error);
          this.utilSvc.dismissLoading();
          console.log(`Error: ${error}`)
          this.utilSvc.presentToast({
            message: `Error: la dirección de correo electrónico ya está en uso por otra cuenta.`,
            duration: 5000,
            color: 'warning',
            icon: 'alert-circle-outline',
          });
        });
    }
  }
}
