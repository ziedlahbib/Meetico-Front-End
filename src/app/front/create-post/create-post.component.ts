import { Component, OnInit } from '@angular/core';
import {FileDB} from "../../models/fileDB";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PublicationService} from "../../services/publication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Publication} from "../../models/publication";
import {Comment} from "../../models/comment";
import {PostLike} from "../../models/PostLike";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public listPub:any;
  public listCom:any;
  listfile2:FileDB[];
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  file: FileDB;
  fileById:FileDB[];

  constructor(private route : ActivatedRoute,private publicationservice: PublicationService,private router: Router) { }
  playSound(){
    let audio = new Audio()
    audio.src= "../assets/confirm2.mp3"
    audio.load();
    audio.play();
  }
  ngOnInit(): void {
  }




  publication : Publication= new Publication();
  comment : Comment= new Comment();
  like : PostLike= new PostLike();



  addPub(){
    this.publicationservice.addPublication(this.publication).subscribe(()=>this.publicationservice.getPubToday().subscribe(

        data=>{
          this.listPub=data
          console.log('dataaaaa',data)


        }
      )
    );

  }
  upload() :FileDB[]{
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.publicationservice.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.publicationservice.getFile2(event.body).subscribe(
            data=>{
              this.file=data;
              console.log('file',this.file)

              this.listfile2.push(this.file);
              console.log('////////',this.listfile2)

            }
          );

        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
    return this.listfile2;
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }









}