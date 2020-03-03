import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notice-edit',
  templateUrl: './notice-edit.component.html',
  styleUrls: ['./notice-edit.component.scss']
})
export class NoticeEditComponent implements OnInit {

  noticeForm: FormGroup;
  _id:number=null;
  title:string='';
  description:string='';
  publicationDate:Date= null; 
  visualizationDate:Date= null;
  isLoadingResults = false;
  
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getNotice(this.route.snapshot.params['id']);
    this.noticeForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'id' : [null]
    });
  }

  getNotice(id) {
    this.api.getNotice(id).subscribe(data => {
      this._id = data.id;
      this.publicationDate = data.publicationDate;
      this.visualizationDate = data.visualizationDate;
      this.noticeForm.setValue({
        title: data.title,
        description: data.description,
        id: data.id
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.updateNotice(this._id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/notices']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
