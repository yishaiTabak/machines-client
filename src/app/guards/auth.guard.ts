import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router)
  const loginService:LoginService = inject(LoginService)
  
  return loginService.isLoginObservable.pipe(take(1), map((isLogin:boolean) =>{    
      if(isLogin)
        return true
      return router.createUrlTree(['/login'])
    }))
    
};
