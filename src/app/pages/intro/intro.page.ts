import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    SplashScreen.hide();
    setTimeout(() => {
      this.router.navigateByUrl('/auth');
    }, 4500);
  }
}
