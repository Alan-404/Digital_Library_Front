import { Component, OnInit } from '@angular/core';
import { GetBookService } from 'src/app/Services/get-book.service';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/Services/author.service';
import { CategoryService } from 'src/app/Services/category.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(private bookService: GetBookService, private active: ActivatedRoute, private authorService: AuthorService, private categoryService: CategoryService, private storage: AngularFireStorage) { }

  editInfor = false;

  bookId: any
  infoPage: any

  showSpinner = false


  allAuthor: any
  allCategory: any

  imageShow: any

  book: any = {_id: '', name: '', description: '', imageLink: '', authorId: '', categoryId: '', linkPdf: ''}

  ngOnInit(): void {
    this.active.queryParams.subscribe(params => {
      this.bookId = params.id
      this.bookService.getInfoBook(this.bookId).subscribe(response => {
        this.infoPage = response
        this.book = this.infoPage.book
        this.imageShow = this.book.imageLink
      })
    })


    this.authorService.getAllAuthors().subscribe(response => {
      this.allAuthor = response
    })

    this.categoryService.getAllCategories().subscribe(response => {
      this.allCategory = response
    })
    
  }


  changePage(){
    this.editInfor = !this.editInfor
  }


  fileImage: any;
  fileImageName: any
  upImage(event:any){
    this.fileImage  = event.target.files[0];
    this.fileImageName = event.target.files[0].name;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
			this.imageShow = reader.result;
		}
  }

  filePdf : any;
  filePdfName: any;
  upPdf(event: any){
    this.filePdf = event.target.files[0];
    this.filePdfName = event.target.files[0].name;
  }

  getInfor(event: any){
    const name = event.target.name;
    const value = event.target.value;

    if (name == "name")
      this.book.name = value;
    else if (name == "des")
      this.book.description = value
  }

  getInforOption(event: any){
    const name = event.target.name;
    const value = event.target.value;

    if (name == "author")
      this.book.authorId = value;
    else if (name == "category")
      this.book.categoryId = value;
  }


  async changeImage(){
    if (!this.fileImage)
      return;
    this.showSpinner = true
    const check = this.book.imageLink.split('firebase')
    if (check.length>1)
      await this.storage.refFromURL(this.book.imageLink).delete();

    const filePathImage = '/bookImages/'+this.fileImageName + Math.random();
    await this.storage.upload(filePathImage, this.fileImage);

    await this.storage.ref(filePathImage).getDownloadURL().subscribe(async (info) => {
      await this.bookService.changeImage(this.bookId, info).subscribe(response => {
        if (response.success){
          this.showSpinner = false;
        }
      })
    })
  }


  async editInformation(){
    this.showSpinner = true
    if (this.filePdf){
      await this.storage.refFromURL(this.book.linkPdf).delete();
      const filePathPdf = '/books/'+this.filePdfName + Math.random();
      await this.storage.upload(filePathPdf, this.filePdf)

      await this.storage.ref(filePathPdf).getDownloadURL().subscribe(info => {
        this.book.linkPdf = info
      })
    }

    console.log(this.book)
    await this.bookService.editInfo(this.book).subscribe(resposne => {
      console.log(resposne)
      if (resposne.success){
        this.showSpinner = false
      }
    })
  }

}
