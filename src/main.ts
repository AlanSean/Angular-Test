import {  enableProdMode } from '@angular/core';
// import {JitCompilerFactory} from '@angular/compiler';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig } from './environments/environment';

// import './utils/class/test/index';
if (AppConfig.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
