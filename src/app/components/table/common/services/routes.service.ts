import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Route} from '../interfaces/route.interface';
import {routesMock} from '../../../../../mocks/routes.mock';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private _routes$$: BehaviorSubject<Route[]> = new BehaviorSubject<Route[]>([]);
  public routes$: Observable<Route[]> = this._routes$$.asObservable();

  public loadRoutes(): void {
    of(routesMock)
        .toPromise()
        .then(routes => {
          this._routes$$.next(routes);
        })
  }
}
