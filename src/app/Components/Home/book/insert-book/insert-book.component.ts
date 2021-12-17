import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GetBookService } from 'src/app/Services/get-book.service';
import { Book } from 'src/app/Interfaces/Book';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthorService } from 'src/app/Services/author.service';
import { CategoryService } from 'src/app/Services/category.service';
@Component({
  selector: 'app-insert-book',
  templateUrl: './insert-book.component.html',
  styleUrls: ['./insert-book.component.css'],
})
export class InsertBookComponent implements OnInit {
  @ViewChild('showAll') myElement: any;
  @ViewChild('show') myDiv: any;


  showSpinner = false;

  fileImage: string  = '';
  fileImageName: string = '';

  filePdf : string = '';
  filePdfName: string = '';
  filePathPdf: string = '/books/';

  urlImage: any;

  allow: string = "<strong>sdfsdfdsf</strong>"

  book: Book = {name:'', author:'', imageLink:'', linkPdf: '', category: '', description: ''}


  listen: any = {success: false, message: ''};


  constructor(private storage: AngularFireStorage, private bookService: GetBookService, private elRef: ElementRef, private authorService: AuthorService, private categoryService: CategoryService) { }

  allAuthors: any
  allCategories: any
  ngOnInit(): void {
    this.authorService.getAllAuthors().subscribe(response => {
      this.allAuthors = response.authors
    })

    this.categoryService.getAllCategories().subscribe(response => {
      this.allCategories = response.categories
    })

  }


  getInforOption(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "author")
      this.book.author = value;
    else if (name == "category")
      this.book.category = value
  }


  getInfo(event: any){
    const name = event.target.name;

    if (name == "name")
      this.book.name = event.target.value;
    else if (name == "author")
      this.book.author = event.target.value;
    else if (name == "category")
      this.book.category = event.target.value;
    else if (name == "description")
      this.book.description = event.target.value;
  }

  upImage(event:any){
    this.fileImage  = event.target.files[0];
    this.fileImageName = event.target.files[0].name;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
			this.urlImage = reader.result;
		}
  }

  upPdf(event: any){
    this.filePdf = event.target.files[0];
    this.filePdfName = event.target.files[0].name;
  }

  async insertBook(){
    this.showSpinner = true
    /* console.log(this.fileImage);
    console.log(this.filePdf); */
    const filePathImage = '/bookImages/'+this.fileImageName + Math.random();
    const filePathPdf = '/books/'+this.filePdfName + Math.random();
    await this.storage.upload(filePathImage, this.fileImage);

    await this.storage.upload(filePathPdf, this.filePdf);

    await this.storage.ref(filePathPdf).getDownloadURL().subscribe(async(infoPdf)=> {
      this.book.linkPdf = infoPdf;

      await this.storage.ref(filePathImage).getDownloadURL().subscribe(async(infoImage) => {
        this.book.imageLink = infoImage;

        await this.bookService.insertBook(this.book).subscribe(response => {
          this.showSpinner = false
          this.listen = response
          setTimeout(() => {
            this.listen.message = '';
          }, 3000)
        });
      })
    })
  }

  

  


}
