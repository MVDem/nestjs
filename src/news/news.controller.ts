import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { INews, NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsServise: NewsService) {}

  @Get('/:id')
  getNews(@Param('id') id: string): INews {
    let idInt = parseInt(id);
    return this.newsServise.find(idInt);
  }

  @Post()
  create(@Body() news: INews): INews {
    return this.newsServise.create(news);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): string {
    let idInt = parseInt(id);
    const isRemoved = this.newsServise.remove(idInt);
    return isRemoved ? 'новость удалена' : 'передан неверный идентификатор';
  }
}
