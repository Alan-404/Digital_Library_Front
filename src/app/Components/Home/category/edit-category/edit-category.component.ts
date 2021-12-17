import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { GetBookService } from 'src/app/Services/get-book.service';
import { Category } from 'src/app/Interfaces/Category';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private active: ActivatedRoute, private categoryService: CategoryService, private bookService: GetBookService, private storage: AngularFireStorage) { }


  showSpinner = false
  categoryId: any

  infoCategory: any
  name: any = ''
  des: any = ''


  imageShow: any
  ngOnInit(): void {
    this.active.queryParams.subscribe(param => {
      this.categoryId = param.id
      this.bookService.getBooksByCategoryId(this.categoryId).subscribe(resposne => {
        this.infoCategory = resposne
        this.category.name = this.infoCategory.category.name
        this.category.description = this.infoCategory.category.description
        this.category.imageLink = this.infoCategory.category.imageLink
        this.imageShow = this.infoCategory.category.imageLink
      })
    })
  }

  category: Category = {name: '', description: '', imageLink: ''}

  getInfo(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "name")
      this.category.name = value;
    else if (name == "des")
      this.category.description = value;
  }


  edit(){
    this.showSpinner = true;
    this.categoryService.editInfo(this.categoryId, this.category.name, this.category.description).subscribe(resposne => {
      if(resposne.success){
        this.showSpinner = false;
      }
    })
  }

  file: any
  fileName: any;
  uploadImage(event: any){
    this.file = event.target.files[0]

    this.fileName = event.target.files[0].name;

    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageShow = reader.result;
    }

  }

  async changeImage(){
    this.showSpinner = true
    const check = this.category.imageLink.split('firebase')
    if (check.length > 1)
      await this.storage.refFromURL(this.category.imageLink).delete();

    const filePath = '/category/'+ this.fileName + Math.random();
    await this.storage.upload(filePath, this.file);

    await this.storage.ref(filePath).getDownloadURL().subscribe(async (infor) => {
      await this.categoryService.changeImage(this.categoryId, infor).subscribe(response => {
        if (response.success){
          this.showSpinner = false
        }
      })
    })
  }

}
