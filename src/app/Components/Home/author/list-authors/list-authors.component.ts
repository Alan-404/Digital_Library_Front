import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/Services/author.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.css']
})
export class ListAuthorsComponent implements OnInit {

  constructor(private authorService: AuthorService, private storage: AngularFireStorage) { }

  infoPage: any = {authors: []}

  listen: any = {success: false, message: ''};

  ngOnInit(): void {

    this.authorService.getAllAuthors().subscribe(response => {
      //console.log(response);
      this.infoPage = response;


    })
  }

  async deleteAuthor(id: string, url: string){
    await this.storage.refFromURL(url).delete().subscribe(async () => {
      await this.authorService.deleteAuthor(id).subscribe(response =>{
        this.listen = response;
        if (this.listen.success)
          window.location.reload()
      });    
    })
    
    //await window.location.reload();
  }


}
