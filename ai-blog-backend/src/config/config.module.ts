import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available across all modules
      envFilePath: '.env', // Path to the .env file
    }),
  ],
})
export class AppConfigModule {}
