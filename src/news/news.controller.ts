import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
} from '@nestjs/common';
import { INews, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderNewsAll } from 'src/views/news/news-all';
import { renderTemplate } from 'src/views/template';
import { renderNewsDetaile } from 'src/views/news/news-detail';

export interface INewsEdit {
  title?: string;
  description?: string;
  autor?: string;
  countView?: number;
}

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsServise: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get('/api/detail/:id')
  get(@Param('id') id: string): INews {
    const idInt = parseInt(id);
    const news = this.newsServise.find(idInt);
    const comments = this.commentsService.find(idInt);

    return {
      ...news,
      comments,
    };
  }

  @Get('/api/all')
  getAll(): INews[] {
    return this.newsServise.getAll();
  }
  @Get('/all')
  getAllView() {
    const news = this.newsServise.getAll();
    const content = renderNewsAll(news);
    return renderTemplate(content, {
      title: 'Список новостей',
      description: 'Новости',
    });
  }

  @Get('/detail/:id')
  getDetailView(@Param('id') id: string) {
    const idInt = parseInt(id);
    const news = this.newsServise.find(idInt);
    const comments = this.commentsService.find(idInt);
    // if (!news) {
    //   res.redirect('/all');
    // }
    const content = renderNewsDetaile(news, comments);
    return renderTemplate(content, {
      title: news.title,
      description: news.description,
    });
  }

  @Post('/api')
  create(@Body() news: INews): INews {
    return this.newsServise.create(news);
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: INewsEdit): INews {
    let idInt = parseInt(id);
    return this.newsServise.edit(idInt, news);
  }

  @Delete('/api/:id')
  remove(@Param('id') id: string): string {
    let idInt = parseInt(id);
    const isRemoved = this.newsServise.remove(idInt);
    return isRemoved ? 'новость удалена' : 'передан неверный идентификатор';
  }
}
