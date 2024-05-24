import {ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {TokenInterceptor} from "./interceptors/token-interceptor";
import {adminRoutes} from "./component/admin/admin.routes";

const tokenInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideRouter(routes),
    //importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(RouterModule.forChild(adminRoutes)),
    provideHttpClient(withFetch()),
    //provideHttpClient(),
    tokenInterceptorProvider,
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
  ]
};
