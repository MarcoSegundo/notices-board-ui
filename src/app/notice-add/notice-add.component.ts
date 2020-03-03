import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-notice-add',
  templateUrl: './notice-add.component.html',
  styleUrls: ['./notice-add.component.scss']
})
export class NoticeAddComponent implements OnInit {
  noticeForm: FormGroup;
  title:string='';
  description:string='';
  publicationDate:Date=null;
  visualizationDate:Date=null;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.noticeForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addNotice(form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/notices']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
