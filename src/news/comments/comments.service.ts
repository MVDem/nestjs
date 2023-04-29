import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dtos/create-comment-dto';

export type Comment = {
  id?: number;
  message: string;
  author: string;
};

export type CommentEdit = {
  id?: number;
  message?: string;
  author?: string;
};

@Injectable()
export class CommentsService {
  private readonly comments = {};

  create(idNews: number, comment: CreateCommentDto) {
    if (!this.comments[idNews]) {
      this.comments[idNews] = [];
    }
    this.comments[idNews].push({
      ...comment,
      id: +Math.random().toFixed(2) * 100,
    });
    return this.comments[idNews];
  }

  edit(idNews: number, idCommentInt: number, comment: CommentEdit) {
    const indexComment = this.comments[idNews].findIndex(
      (e) => e.id === idCommentInt,
    );
    if (!this.comments[idNews] || indexComment === -1) {
      return false;
    }
    this.comments[idNews][indexComment] = {
      ...this.comments[idNews][indexComment],
      ...comment,
    };
    return this.comments[idNews];
  }

  find(idNews: number): CreateCommentDto[] | undefined {
    return this.comments[idNews] || undefined;
  }

  remove(idNews: number, idComment: number): Comment[] | undefined {
    if (!this.comments[idNews]) {
      return null;
    }
    const indexComment = this.comments[idNews].findIndex(
      (e) => e.id === idComment,
    );
    if (indexComment === -1) {
      return null;
    }
    return this.comments[idNews].splice(indexComment, 1);
  }
}
