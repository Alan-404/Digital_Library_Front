import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/Auth/login/login.component';
import { AuthLandingComponent } from './Components/Auth/auth-landing/auth-landing.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomeLandingComponent } from './Components/Home/layouts/home-landing/home-landing.component';
import { HeaderComponent } from './Components/Home/layouts/header/header.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerEffectComponent } from './Components/Effects/spinner-effect/spinner-effect.component';
import { MainPageComponent } from './Components/Home/layouts/main-page/main-page.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ForgotPasswordComponent } from './Components/Auth/forgot-password/forgot-password.component';
import { ShowBookComponent } from './Components/Home/book/show-book/show-book.component';
import { AllCategoriesComponent } from './Components/Home/category/all-categories/all-categories.component';
import { CategoryComponent } from './Components/Home/category/category/category.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AuthorsComponent } from './Components/Home/author/authors/authors.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AuthorComponent } from './Components/Home/author/author/author.component';
import { AdminComponent } from './Components/Home/layouts/admin/admin.component';
import { AccessDeniedComponent } from './Components/Error/access-denied/access-denied.component';
import { NewsComponent } from './Components/Home/news/news/news.component';
import { BlogComponent } from './Components/Home/blog/blog/blog.component';
import { BlogsComponent } from './Components/Home/blog/blogs/blogs.component';
import { NotFoundComponent } from './Components/Error/not-found/not-found.component';
import { MyInfoComponent } from './Components/Home/user/my-info/my-info.component';
import { InsertAuthorComponent } from './Components/Home/author/insert-author/insert-author.component';
import { InsertBookComponent } from './Components/Home/book/insert-book/insert-book.component';
import { ReadBookComponent } from './Components/Home/book/read-book/read-book.component';
import { ListAuthorsComponent } from './Components/Home/author/list-authors/list-authors.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { InsertNewsComponent } from './Components/Home/news/insert-news/insert-news.component';
import { UsersComponent } from './Components/Home/user/users/users.component';
import { AddBlogComponent } from './Components/Home/blog/add-blog/add-blog.component';
import { HomeAdminComponent } from './Components/Home/home-admin/home-admin.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AllNewsComponent } from './Components/Home/news/all-news/all-news.component';
import { AddCategoryComponent } from './Components/Home/category/add-category/add-category.component';
import { SearchComponent } from './Components/Home/search/search.component';
import { firebaseConfig } from './Common/Constants';
import { EditProfileComponent } from './Components/Home/user/edit-profile/edit-profile.component';
import { LayoutProfileComponent } from './Components/Home/layouts/layout-profile/layout-profile.component';


const appRoutes: Routes = [
  {
    path: '', 
    redirectTo: 'home/mainPage', 
    pathMatch: 'full'
  },
  {
    path: 'auth', 
    component: AuthLandingComponent, 
    children: 
      [
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {path:'forgotPass', component:ForgotPasswordComponent}
      ]
  },
  {
    path:'home', 
    component: HomeLandingComponent,
    children:
    [
      {path: 'mainPage',component: MainPageComponent},
      {path: 'book',component: ShowBookComponent},
      {path:'allCategories', component:AllCategoriesComponent},
      {path: 'category', component: CategoryComponent},
      {path: 'authors', component: AuthorsComponent},
      {path: 'author', component: AuthorComponent},
      {path: 'admin', component: AdminComponent, children: [
        {path: 'homeAdmin', component: HomeAdminComponent},
        {path: 'insertAuthor', component: InsertAuthorComponent},
        {path: 'insertBook',component: InsertBookComponent},
        {path: 'listAuthors', component: ListAuthorsComponent},
        {path: 'insertNews', component: InsertNewsComponent},
        {path: 'users', component: UsersComponent},
        {path:'addCategory', component: AddCategoryComponent}
      ]},
      {path: 'news', component: NewsComponent},
      {path: 'blogs', component:BlogsComponent},
      {path: 'blog', component: BlogComponent},
      {path: 'readBook', component: ReadBookComponent},
      {path: 'addBlog', component: AddBlogComponent},
      {path: 'allNews', component: AllNewsComponent},
      {path: 'info', component: LayoutProfileComponent, children: [
        {path: 'my-info', component: MyInfoComponent},
        {path: 'edit-info', component: EditProfileComponent}
      ]}
    ]
  },
  {path:'accessDenied', component: AccessDeniedComponent},
  {path: 'notFound', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthLandingComponent,
    RegisterComponent,
    HomeLandingComponent,
    HeaderComponent,
    SpinnerEffectComponent,
    MainPageComponent,
    ForgotPasswordComponent,
    ShowBookComponent,
    AllCategoriesComponent,
    CategoryComponent,
    AuthorsComponent,
    AuthorComponent,
    AdminComponent,
    AccessDeniedComponent,
    NewsComponent,
    BlogComponent,
    BlogsComponent,
    NotFoundComponent,
    MyInfoComponent,
    InsertAuthorComponent,
    InsertBookComponent,
    ReadBookComponent,
    ListAuthorsComponent,
    InsertNewsComponent,
    UsersComponent,
    AddBlogComponent,
    HomeAdminComponent,
    AllNewsComponent,
    AddCategoryComponent,
    SearchComponent,
    EditProfileComponent,
    LayoutProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    RouterModule.forRoot(appRoutes),
    RichTextEditorModule,
    FormsModule,
    CKEditorModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
