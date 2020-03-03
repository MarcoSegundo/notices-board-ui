import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Notice } from '../notice';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit {

  notice: Notice = { id: null, title: '', description: '', publicationDate: null, visualizationDate: null };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getNoticeDetails(this.route.snapshot.params['id']);
  }

  getNoticeDetails(id) {
    this.api.getNotice(id)
      .subscribe(data => {
        this.notice = data;
        console.log(this.notice);
        this.isLoadingResults = false;
      });
  }

  deleteNotice(id) {
    this.isLoadingResults = true;
    this.api.deleteNotice(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/notices']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  editNoticeRoute(id) {
    this.router.navigate(['/notice-edit', id]);
  }

}
