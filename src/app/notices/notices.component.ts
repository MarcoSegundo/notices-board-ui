import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Notice } from '../notice';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit {
  displayedColumns: string[] = ['title'];
  data: Notice[] = [];
  isLoadingResults = true;
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getNotices()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
