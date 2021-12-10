
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBookService } from 'src/app/Services/get-book.service';
import { CommentService } from 'src/app/Services/comment.service';
import { Comment } from 'src/app/Interfaces/Comment';
@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {

  constructor(private route: ActivatedRoute, private getBookSservice: GetBookService, private router: Router, private commentService: CommentService) { }
  bookId: String = '';

  bookInfo: any = {};
  categoryName: string = '';
  authorName: string = '';
  infoPage: any = {success: false, book: {}, categoryName:''};


  allBooksByCategory: any= {books: []};
  allBooksByAuthor: any = {books: []};

  recommendOptions: any = [];
  temp: any = [];
  recommendArray: any = [];
  indexRecommand: number = 0;
  show: any = [];

  animate = 'w3-animate-right'

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //console.log(params);
      this.bookId = params.id;
    })


    this.getBookSservice.getInfoBook(this.bookId).subscribe(response=>{
      this.infoPage = response;
      if (this.infoPage.success)
      {
        this.bookInfo = this.infoPage.book;
        if (response.categoryName == 'novel')
          this.categoryName = "Tiểu Thuyết"
        this.authorName = response.authorName;   
        this.comment.objId = this.infoPage.book._id;
        
        this.getBookSservice.getBooksByAuthorId(this.infoPage.book.authorId).subscribe(response => {
          this.allBooksByAuthor = response;
          this.recommendOptions = this.allBooksByAuthor.books;


          for (var i = 0; i<this.recommendOptions.length; i++)
          {
            if (!this.recommendOptions[i])
              break;
            if (i%4==0){
              if (i!=0)
              {
                this.recommendArray.push(this.temp);
                this.temp = [];
              }
                
            }
            this.temp.push(this.recommendOptions[i]);
          }
          this.recommendArray.push(this.temp);
          this.show = this.recommendArray[this.indexRecommand];
        })

        this.commentService.getAllCommentIdObjId(this.comment.objId).subscribe(response => {
          this.allComment = response;
        })

        //
      }
    })



    
  }

  go(){
    /* this.router.navigate(['home/book'], {queryParams: {id}}) */
    window.location.reload();
  }


  next(){
    this.animate = 'w3-animate-right'
    if (this.indexRecommand == this.recommendArray.length-1)
      this.indexRecommand = 0;
    else
      this.indexRecommand++;
    this.show = [];
    this.show = this.recommendArray[this.indexRecommand];
  }
  
  prev(){
    this.animate = 'w3-animate-left'
    if (this.indexRecommand == 0)
      this.indexRecommand = this.recommendArray.length-1;
    else 
      this.indexRecommand--;
    
    this.show = [];
    this.show = this.recommendArray[this.indexRecommand];
  }

  commentContent: string = '';
  message: string = '';
  comment: Comment = {objId: '', accountId: '', content: '', reply: []};


  allComment: any = {comments: [], users: []}

  getComment(event: any){
    this.commentContent = event.target.value;
  }

  
  response: any = {success: false}
  addComment(){
    //console.log(this.comment.objId);
    this.comment.content = this.commentContent;
    this.commentService.insertComment(this.comment).subscribe(response => {
      this.response = response;
      if (this.response){
        this.commentService.getAllCommentIdObjId(this.comment.objId).subscribe(response => {
          this.allComment = response;
        })
      }
    })
  }
}
