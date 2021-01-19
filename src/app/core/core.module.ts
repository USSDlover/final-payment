import {AppConfigService} from './services';
import {AppConfigInterface} from './interfaces';
import {APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './import.guard';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './services';

export function initializeApp(appConfig: AppConfigService): () => Promise<AppConfigInterface> {
  return () => appConfig.load();
}

const Providers = [
  ApiService
];

@NgModule({
  imports: [HttpClientModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        AppConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: initializeApp,
          deps: [AppConfigService], multi: true
        },
        ...Providers
      ]
    } as ModuleWithProviders<any>;
  }
}
