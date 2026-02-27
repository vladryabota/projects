// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Změň 'App' na 'AppComponent'

bootstrapApplication(AppComponent, appConfig) // Změň 'App' na 'AppComponent'
  .catch((err) => console.error(err));
