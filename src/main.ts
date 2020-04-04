import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { resolve } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 静态资源设置
  app.useStaticAssets(resolve(__dirname, '..', 'public'));
  // 模板页面目录
  app.setBaseViewsDir(resolve(__dirname, '..', 'views'));
  // 模板引擎设置
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('PIM 接口文档')
    .setDescription('我的天，洗脚真爽')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
