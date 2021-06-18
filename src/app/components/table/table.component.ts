import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppComponentClass} from '../../common/classes/app-component.class';
import {RoutesService} from './common/services/routes.service';
import {MatSort} from '@angular/material/sort';
import {TableDataSource} from './table-datasource';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import {Route} from './common/interfaces/route.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent extends AppComponentClass implements OnInit, AfterViewInit {
  public dataSource: TableDataSource = new TableDataSource();
  public displayedColumns: string[] = ['address', 'gateway', 'interface'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Route>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  constructor(private readonly routesService: RoutesService) {
    super();
  }

  ngOnInit(): void {
    this._observeSafe(this.routesService.routes$).subscribe(routes => {
      this.dataSource.data = routes;
    });

    this.routesService.loadRoutes();
  }
}
