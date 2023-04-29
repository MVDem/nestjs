import { Comment } from 'src/news/comments/comments.service';
import { CreateCommentDto } from 'src/news/comments/dtos/create-comment-dto';
import { INews } from 'src/news/news.service';

export function renderNewsDetaile(
  news: INews,
  comments: CreateCommentDto[],
): string {
  return `
  <img src="${news.cover}" alt="">
  <h1>${news.title}</h1>
  <p>${news.description}</p>
  <p>Автор : ${news.autor}</p>
  ${comments ? renderNewsComments(comments) : 'Комментариев нет'}
`;
}
export function renderNewsComments(comments: CreateCommentDto[]): string {
  let html = '<H3>Комментарии:</H3>';
  for (const comment of comments) {
    html += `<div>
              ${
                comment?.avatar &&
                `<img src="${comment?.avatar}" style="width:75px; height:75px; object-fit:cover"/>`
              }
              <div>
                <p>${comment.author} : ${comment.message}</p>
              <div/>
            <div/>`;
  }
  return html;
}
