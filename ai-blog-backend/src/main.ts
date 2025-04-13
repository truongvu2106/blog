import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.setGlobalPrefix('api');
  // Enable CORS
  app.enableCors({
    origin: '*', // ['http://localhost:3000'], // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // app.use(logger);

  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}/api`);
}
bootstrap();
