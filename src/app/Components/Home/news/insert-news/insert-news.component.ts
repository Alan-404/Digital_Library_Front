import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { News } from 'src/app/Interfaces/News';
import { NewsService } from 'src/app/Services/news.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-insert-news',
  templateUrl: './insert-news.component.html',
  styleUrls: ['./insert-news.component.css']
})
export class InsertNewsComponent implements OnInit {

  showSpinner = false;
  toolbarHiddenButtons =  [
    [
      'undo',
      'redo',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent',
      'insertUnorderedList',
      'insertOrderedList',
      'heading',
      'fontName'
    ],
    [
      'fontSize',
      'textColor',
      'backgroundColor',
      'customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
      'toggleEditorMode'
    ]
  ]

    editorConfig: AngularEditorConfig = {
      editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'localhost:4200',
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['bold', 'italic'],
        ['fontSize']
      ]
  };



  @ViewChild("content") public content: any;
  //@ViewChild("newsContent") public newContent: any;
  constructor(private storage: AngularFireStorage, private newsService: NewsService) { }
  public Editor = ClassicEditor;

  str: string = '';

  file: string = '';
  fileName: string = '';
  image: any;
  urlImage:any;

  news: News = {title: '', thumnail: '',introduction: '', content: '' }

  upThumnail(event:any){
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    this.image = this.file;

    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.urlImage = reader.result;
    }
  }

  ngOnInit(): void {
    
  }

  getInfo(event: any){
    var name = event.target.name;
    if (name == "title")
      this.news.title = event.target.value;
    else if (name == "introduction")
      this.news.introduction = event.target.value;
  }


  async addNews(){
    //console.log(this.news);
    this.showSpinner = true
    const filePath = '/newsThumnail/'+ this.fileName + Math.random();
    await this.storage.upload(filePath, this.file);
    
    
    
    await this.storage.ref(filePath).getDownloadURL().subscribe(async (info)=> {
      this.news.thumnail = info;
      this.news.content = this.content.editorInstance.getData();
      await this.newsService.insertNews(this.news).subscribe(response => {
        if (response.success)
          this.showSpinner = false;
      });
    })
    //console.log(this.newContent);
  }

  onReady(event:any){
    if (event.model.schema.isRegistered('image')){
      event.model.schema.extend('image', {allowAttributes: 'blockIndent'});
    }
  }


}
