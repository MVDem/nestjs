import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { INews, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderNewsAll } from 'src/views/news/news-all';
import { renderTemplate } from 'src/views/template';
import { renderNewsDetaile } from 'src/views/news/news-detail';
import { CreateNewsDto } from './dtos/create-news-dto';
import { EditNewsDto } from './dtos/edit-news-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/helperFileLoader';

const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;

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
    const content = renderNewsDetaile(news, comments);
    return renderTemplate(content, {
      title: news.title,
      description: news.description,
    });
  }

  @Post('/api')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ): INews {
    const fileExtantion = cover.originalname.split('.').reverse()[0];
    if (!fileExtantion || !fileExtantion.match(/(jpeg|png|jpg|gif)$/)) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Прикрепите файл с раширением jpeg,png,jpg,gif',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (cover?.filename) {
      news.cover = PATH_NEWS + cover.filename;
    }
    return this.newsServise.create(news);
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: EditNewsDto): INews {
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
