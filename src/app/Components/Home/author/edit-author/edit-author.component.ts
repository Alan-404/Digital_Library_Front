import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/Services/author.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {

  constructor(private active: ActivatedRoute, private authorService: AuthorService, private storage: AngularFireStorage) { }

  imageShow:any= ''
  authorId: string = ''
  inforPage: any

  author: any = {_id: '', name: '', description: '', imageLink: ''}
  ngOnInit(): void {
    this.active.queryParams.subscribe(params=> {
      this.authorId = params.id;
      this.authorService.getAuthorById(this.authorId).subscribe(resposne => {
        this.author = resposne.author
        this.inforPage = resposne.author
        this.imageShow = this.inforPage.imageLink
      })
    })
  }


  getInfor(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "name")
      this.author.name = value;
    else if (name == "des")
      this.author.description = value;
  }

  file: any;
  fileName: any
  uploadImage(event: any){
    this.file  = event.target.files[0];
    this.fileName = event.target.files[0].name;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
			this.imageShow = reader.result;
		}
  }

  showProcess = false

  async editAuthor(){
    this.showProcess = true
    if (this.file){
      await this.storage.refFromURL(this.author.imageLink).delete();

      const filePath =  '/authors/'+this.fileName + Math.random();

      await this.storage.upload(filePath, this.file);

      await this.storage.ref(filePath).getDownloadURL().subscribe(async (info) => {
        this.author.imageLink = info;
        await this.authorService.edit(this.author).subscribe(response => {
          if (response.success)
            this.showProcess = false;
        })
      })
    }
    else{
      await this.authorService.edit(this.author).subscribe(response => {
        if (response.success)
          this.showProcess = false;
      })
    }
    
  }

}
