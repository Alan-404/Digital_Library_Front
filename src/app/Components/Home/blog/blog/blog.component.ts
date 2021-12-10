import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/Services/blog.service';
import { CommentService } from 'src/app/Services/comment.service';
import { Comment } from 'src/app/Interfaces/Comment';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private route: ActivatedRoute, private blogService: BlogService, private commentService: CommentService) { }

  blogId: string = '';

  infoPage: any = {blog:{}, writer:'', commenter: []}


  commentContent: string = '';
  message: string = '';
  comment: Comment = {objId: '', accountId: '', content: '', reply: []};


  allComment: any = {comments: [], users: []}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.blogId = params.id;
    })

    this.blogService.getBlogById(this.blogId).subscribe(response =>{
      this.infoPage = response;
      this.comment.objId = this.infoPage.blog._id;
      this.commentService.getAllCommentIdObjId(this.infoPage.blog._id).subscribe(response => {
        this.allComment =response;
      })
    })
  }


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
        this.commentService.getAllCommentIdObjId(this.infoPage.blog._id).subscribe(response => {
          this.allComment =response;
        })
      }
    })
  }

}
