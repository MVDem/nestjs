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
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { INews, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { CreateNewsDto } from './dtos/create-news-dto';
import { EditNewsDto } from './dtos/edit-news-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/helperFileLoader';
import { MailService } from 'src/mail/mail.service';

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
    private readonly mailService: MailService,
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

  @Get('all')
  @Render('news-list')
  getAllView() {
    const news = this.newsServise.getAll();
    // const content = renderNewsAll(news);
    // return renderTemplate(content, {
    //   title: 'Список новостей',
    //   description: 'Новости',
    // });
    return { news };
  }

  @Get('create/new')
  @Render('create-news')
  async createView() {
    return {};
  }

  @Get('/detail/:id')
  @Render('news-detail')
  getDetailView(@Param('id') id: string) {
    const idInt = parseInt(id);
    const news = this.newsServise.find(idInt);
    const comments = this.commentsService.find(idInt);
    return { news, comments };
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
  async create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ): Promise<INews> {
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
    const createdNews = this.newsServise.create(news);
    await this.mailService.sendNewNewsForAdmins(
      ['9602598255@mail.ru'],
      createdNews,
    );
    return createdNews;
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
