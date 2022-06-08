import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { BananesModule } from './bananes/bananes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27018', {
      dbName: 'copabanana',
    }),
    ProductsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      exclude: ['/api*'],
    }),
    UsersModule,
    BananesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
