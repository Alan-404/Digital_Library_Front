import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService, private storage: AngularFireStorage, private router: Router) { }

  showSpinner = false

  allCategories: any
  loadCategories(){
    this.categoryService.getAllCategories().subscribe(resposne => {
      this.allCategories = resposne.categories
    })
  }
  ngOnInit(): void {
    this.loadCategories()
  }


  async deleteCategory(id: string, image: string){
    this.showSpinner = true
    await this.storage.refFromURL(image).delete().subscribe(async() => {
      this.categoryService.deleteCategory(id).subscribe(rep => {
        if (rep.success){
          this.loadCategories()
          this.showSpinner = false
        }
      })
    })
  }


  goCategoryPage(id: string){
    this.router.navigate(['home/admin/edit-category'], {queryParams:{id}})
  }

}
