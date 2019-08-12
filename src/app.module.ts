import {
  Module,
  NestModule,
  MiddlewareConsumer,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { DemoMiddleware } from './core/middlewares/demo.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DemoRolesGuard } from './core/guards/demo-roles.guard';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // PostsModule,
    PostModule,
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: DemoRolesGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DemoMiddleware).forRoutes('posts');
  }
}
