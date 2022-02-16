import { enableProdMode } from '@angular/core';
// import {JitCompilerFactory} from '@angular/compiler';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig } from './environments/environment';

// import './utils/class/test/index';
if (AppConfig.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

import { addPouchPlugin, createRxDatabase, getRxStoragePouch } from 'rxdb';

import * as Rouchdb from 'pouchdb-adapter-idb';
(async () => {
  addPouchPlugin(Rouchdb);

  const db = await createRxDatabase({
    name: 'heroesdb', // <- name
    storage: getRxStoragePouch('idb'), // <- RxStorage
    password: 'myPassword', // <- password (optional)
    multiInstance: true, // <- multiInstance (optional, default: true)
    eventReduce: true, // <- eventReduce (optional, default: true)
  });
})();
