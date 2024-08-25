import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthInterceptorProvider,  // Adiciona o interceptor corretamente
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideNoopAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 2000,
        closeButton: true,
        progressBar: true
      })
    ),
    provideNgxMask()
  ]
};
