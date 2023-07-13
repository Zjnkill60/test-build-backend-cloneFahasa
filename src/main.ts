import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //config merge response
  app.useGlobalInterceptors(new TransformInterceptor());

  //config static file
  app.useStaticAssets(path.join('./', 'public'));

  //config auto validation
  app.useGlobalPipes(new ValidationPipe());

  //config cookie 
  app.use(cookieParser());

  //config cors
  app.enableCors({
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true,
    exposedHeaders: ['set-cookie'],

  });

  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //   res.setHeader('Cross-origin-Embedder-Policy', 'require-corp');
  //   res.setHeader('Cross-origin-Opener-Policy', 'same-origin');

  //   if (req.method === 'OPTIONS') {
  //     res.sendStatus(200)
  //   } else {
  //     next()
  //   }
  // });

  await app.listen(process.env.PORT);
}
bootstrap();
