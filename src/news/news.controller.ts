import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { INews, NewsService } from './news.service';

export interface INewsEdit {
  title?: string;
  description?: string;
  autor?: string;
  countView?: number;
}

@Controller('news')
export class NewsController {
  constructor(private readonly newsServise: NewsService) {}

  @Get('/detail/:id')
  getNews(@Param('id') id: string): INews {
    let idInt = parseInt(id);
    return this.newsServise.find(idInt);
  }

  @Get('/all')
  getAll(): INews[] {
    return this.newsServise.getAll();
  }

  @Post()
  create(@Body() news: INews): INews {
    return this.newsServise.create(news);
  }

  @Put('/:id')
  edit(@Param('id') id: string, @Body() news: INewsEdit): INews {
    let idInt = parseInt(id);
    return this.newsServise.edit(idInt, news);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): string {
    let idInt = parseInt(id);
    const isRemoved = this.newsServise.remove(idInt);
    return isRemoved ? 'новость удалена' : 'передан неверный идентификатор';
  }
}
