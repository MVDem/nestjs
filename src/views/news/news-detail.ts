import { Comment } from 'src/news/comments/comments.service';
import { INews } from 'src/news/news.service';

export function renderNewsDetaile(news: INews, comments: Comment[]): string {
  return `
  <img src="${news.cover}" alt="">
  <h1>${news.title}</h1>
  <p>${news.description}</p>
  <p>Автор : ${news.autor}</p>
  ${comments ? renderNewsComments(comments) : 'Комментариев нет'}
`;
}
export function renderNewsComments(comments: Comment[]): string {
  let html = '';
  for (const comment of comments) {
    html += `<div><p>${comment.author} : ${comment.message}</p>
    <div/>`;
  }
  return html;
}
