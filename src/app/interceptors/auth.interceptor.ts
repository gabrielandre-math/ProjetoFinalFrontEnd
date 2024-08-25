import { Injectable } from '@angular/core';
import { 
    HttpRequest, 
    HttpHandler, 
    HttpEvent, 
    HttpInterceptor, 
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        if (token) {
          const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`)});
          return next.handle(cloneReq);
        } else {
          return next.handle(request);
        }
    }
}

// Exporta o array como um único provedor
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
