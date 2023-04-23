import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private themeSvc:ThemeService) {
    
    this.themeSvc.setInitialTheme();
  }

  /* initializeApp(){
    
  } */
  /* ionViewDidEnter(){
    SplashScreen.hide();
  } */
}
