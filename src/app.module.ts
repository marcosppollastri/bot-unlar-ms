import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from '@src/controllers/chat.controller';
import { ChatService } from './services';
@Module({
  imports: [],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService],
})
export class AppModule {}
