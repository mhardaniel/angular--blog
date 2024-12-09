import {inject, Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {Observable} from 'rxjs'
import {PersistanceService} from './persistance.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  persistanceService = inject(PersistanceService)
  router = inject(Router)

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.persistanceService.get('accessToken')

    if (!token) {
      this.router.navigate(['/login'])
      return false
    }

    return true
  }
}
