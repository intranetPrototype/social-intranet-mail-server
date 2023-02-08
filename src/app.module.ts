import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { SendgridService } from './services';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [SendgridService],
})
export class AppModule {}
