import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from "@angular/common/http";
import {withFetch} from "@angular/common/http";
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {Provider} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration()]
};
