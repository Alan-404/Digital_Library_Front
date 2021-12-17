import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/Services/author.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.css']
})
export class ListAuthorsComponent implements OnInit {

  constructor(private authorService: AuthorService, private storage: AngularFireStorage, private router: Router) { }

  infoPage: any = {authors: []}

  listen: any = {success: false, message: ''};

  showSpinner= false;

  loadAuthors(){
    this.authorService.getAllAuthors().subscribe(response => {
      //console.log(response);
      this.infoPage = response;


    })
  }

  ngOnInit(): void {
    this.loadAuthors()
    
  }

  async deleteAuthor(id: string, url: string){
    this.showSpinner = true
    await this.storage.refFromURL(url).delete().subscribe(async () => {
      await this.authorService.deleteAuthor(id).subscribe(response =>{
        this.listen = response;
        if (this.listen.success){
          this.loadAuthors();
          this.showSpinner = false;
        }
      });    
    })
  
  }


  goToEdit(id: string){
    this.router.navigate(['home/admin/edit-author'], {queryParams: {id}})
  }


}
