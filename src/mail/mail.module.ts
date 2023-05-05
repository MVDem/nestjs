import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://news-blog-maxim@mail.ru:iSt2OTtlrU4-@smtp.mail.ru',
      transport:
        'smtps://news-blog-maxim@mail.ru:ZpjurSH1gfsEPRUXsqfR@smtp.mail.ru',
      defaults: {
        from: '"NestJS робот" <news-blog-maxim@mail.ru>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailService],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
