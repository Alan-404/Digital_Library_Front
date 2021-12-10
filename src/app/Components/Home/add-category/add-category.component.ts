import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Category } from 'src/app/Interfaces/Category';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CategoryService } from 'src/app/Services/category.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  constructor(private storage: AngularFireStorage, private categoryService: CategoryService) { }

  public Editor = ClassicEditor;

  category: Category = {name: '', imageLink: '', description: ''}
  file: string = '';
  fileName: string = '';
  image: any;
  imageShow: any;

  ngOnInit(): void {
  }

  getInfo(event: any){
    var name = event.target.name;
    var value = event.target.value;
    if (name == "name")
      this.category.name = value;
    else if (name == "description")
      this.category.description = value;
  }

  upImage(event: any){
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.image = this.file;

      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imageShow = reader.result;
    }
  }


  async addCategory(){
    const filePath = '/category/'+ this.fileName + Math.random();
    await this.storage.upload(filePath, this.file);

    await this.storage.ref(filePath).getDownloadURL().subscribe(async (info) => {
      this.category.imageLink = info;
      await this.categoryService.addCategory(this.category).subscribe(response => {
        console.log(response);
      });
    })
  }
}
