import {Component, OnInit} from '@angular/core';
import {AppComponentClass} from '../../common/classes/app-component.class';
import {RoutesService} from './common/services/routes.service';
import {Route} from './common/interfaces/route.interface';
import {SortCondition} from './common/interfaces/sort-condition.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent extends AppComponentClass implements OnInit {
  public routes!: Route[];
  public filteredRoutes!: Route[];
  public displayedColumns: string[] = ['address', 'gateway', 'interface'];
  public cachedConditions: SortCondition = {active: '', direction: ''};

  constructor(private readonly routesService: RoutesService) {
    super();
  }

  ngOnInit(): void {
    this._observeSafe(this.routesService.routes$).subscribe(routes => {
      this.routes = routes;
      this.handleSort();
    });

    this.routesService.loadRoutes();
  }

  public handleSort(condition?: SortCondition): void {
    this.cachedConditions = condition || this.cachedConditions;

    if (
      this.cachedConditions.active === 'address' ||
      this.cachedConditions.active === 'gateway'
    ) {
      if (this.cachedConditions.direction === 'asc') {
        this.filteredRoutes = this.routes.sort(this.sortByIp);
      } else {
        this.filteredRoutes = this.routes.sort(this.sortByIp).reverse();
      }
    } else {
      if (this.cachedConditions.direction === 'asc') {
        this.filteredRoutes = this.routes.sort();
      } else {
        this.filteredRoutes = this.routes.sort().reverse();
      }
    }
  }

  public sortByIp = (a: Route, b: Route) => {
    const num1 = Number(
      a.address
        .split('.')
        .map(num => `000${num}`.slice(-3))
        .join('')
    );
    const num2 = Number(
      b.address
        .split('.')
        .map(num => `000${num}`.slice(-3))
        .join('')
    );

    return num1 - num2;
  };
}
