import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRoot(process.env.MONGODB_URI || ''), // Connect to MongoDB
    AuthModule, PostsModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply to all routes
  }
}
