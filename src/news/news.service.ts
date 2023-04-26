import { Injectable } from '@nestjs/common';

export interface INews {
  id: number;
  title: string;
  description: string;
  autor: string;
  countView: number;
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
    },
  ];

  create(news: INews) {
    const id: number = +Math.random().toFixed(2) * 100;
    console.log(id);
    const finalNews = { ...news, id: id };
    this.news.push(finalNews);
    return finalNews;
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
