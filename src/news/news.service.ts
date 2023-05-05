import { Injectable } from '@nestjs/common';
import { INewsEdit } from './news.controller';
import { Comment } from './comments/comments.service';

export interface INews {
  id?: number;
  title: string;
  description: string;
  autor: string;
  countView: number;
  comments?: Comment[];
  cover?: string;
}

@Injectable()
export class NewsService {
  private readonly news: INews[] = [
    {
      id: 1,
      title: 'Первая новость',
      description: 'текст новости',
      autor: 'Максим',
      countView: 2,
      cover: '/696835ec-c268-4b4c-bfa5-9cc88893f156.jpg',
    },
  ];

  create(news: INews) {
    const id: number = +Math.random().toFixed(2) * 100;
    console.log(id);
    const finalNews = { ...news, id: id };
    this.news.push(finalNews);
    return finalNews;
  }

  getAll(): INews[] {
    return this.news;
  }

  edit(id: number, news: INewsEdit): INews | undefined {
    const indexEditNews = this.news.findIndex((news: INews) => news.id === id);
    if (indexEditNews !== -1) {
      this.news[indexEditNews] = {
        ...this.news[indexEditNews],
        ...news,
      };
      return this.news[indexEditNews];
    }
    return undefined;
  }

  find(id: INews['id']): INews | undefined {
    return this.news.find((news: INews) => news.id === id);
  }

  remove(id: INews['id']): boolean {
    const indexRemoveNews = this.news.findIndex(
      (news: INews) => news.id === id,
    );
    if (indexRemoveNews !== -1) {
      this.news.splice(indexRemoveNews, 1);
      return true;
    }
    return false;
  }
}
