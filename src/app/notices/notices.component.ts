import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../api.service';
import { Notice } from '../notice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'buttons'];
  data: Notice[] = [];
  isLoadingResults = true;
  dataSource : MatTableDataSource<Notice>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getNotices()
      .subscribe(res => {
        this.data = res;
        this.dataSource = new MatTableDataSource<Notice>(this.data);
        this.dataSource.paginator = this.paginator;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  deleteNotice(id) {
    this.isLoadingResults = true;
    this.api.deleteNotice(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.reloadComponent();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  editNoticeRoute(id) {
    this.router.navigate(['/notice-edit', id]);
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/notices']);
}

}
