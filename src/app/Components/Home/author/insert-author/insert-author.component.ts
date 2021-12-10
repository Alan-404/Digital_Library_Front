import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Author } from 'src/app/Interfaces/Author';
import { AuthorService } from 'src/app/Services/author.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-insert-author',
  templateUrl: './insert-author.component.html',
  styleUrls: ['./insert-author.component.css']
})
export class InsertAuthorComponent implements OnInit {
  public Editor = ClassicEditor;

  file: string = '';

  urlImage: any;

  fileName: string= '';

  author: Author = {name:'', description: '', imageLink: ''}


  listen: any = {success: false, message: ''};

  image: any;

  showNotice: boolean = false;

  constructor(private storage: AngularFireStorage, private authorService: AuthorService) { }

  ngOnInit(): void {
  }

  getInfo(event: any){
    if (event.target.name == 'name')
      this.author.name = event.target.value;
    else if (event.target.name == 'description')
      this.author.description = event.target.value;
  }

  upFile(event:any){
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    this.image = this.file;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.urlImage = reader.result;
    }

  }

  async insertAuthor(){
    //console.log(this.author);
    const filePath = '/authors/'+ this.fileName + Math.random();
    await this.storage.upload(filePath, this.file);

    await this.storage.ref(filePath).getDownloadURL().subscribe(async (info) => {
      this.author.imageLink = info;
      await this.authorService.insertAuthor(this.author).subscribe(response => {
        this.listen = response;
        this.showNotice = true;
        /* setTimeout(() => {
          this.listen.message = ''
        }, 4000) */
      })
    })
  }


  reload(){
    window.location.reload();
  }
  

}
