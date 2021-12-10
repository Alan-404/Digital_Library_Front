import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Blog } from 'src/app/Interfaces/Blog';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  @ViewChild("content") public content: any;
  constructor(private storage: AngularFireStorage, private blogService: BlogService) { }

  public Editor = ClassicEditor;

  blog: Blog= {title: '', introduction: '', content: '',thumnail: '', comment: [], userId: ''}

  file: string = '';
  fileName: string = '';
  image: any;
  urlImage:any;

  ngOnInit(): void {

  }

  getInfo(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "title")
      this.blog.title = value;
    else if (name == "introduction")
      this.blog.introduction = value;
  }

  upImage(event: any){
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    this.image = this.file;

    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.urlImage = reader.result;
    }
  }

  async addBlog(){
    const filePath = '/blogs/'+ this.fileName + Math.random();
    await this.storage.upload(filePath, this.file);

    await this.storage.ref(filePath).getDownloadURL().subscribe(async (info) => {
      this.blog.thumnail = info;
      this.blog.content = this.content.editorInstance.getData();
      await this.blogService.addBlog(this.blog).subscribe(response => {
        console.log(response);
      })
    })
  }




}
