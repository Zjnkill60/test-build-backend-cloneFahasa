import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: process.env.CONNECT_STRING,
    }),
  }), UsersModule, AuthModule, FileModule, OrdersModule, ProductsModule, CommentsModule, DatabaseModule, MailModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
