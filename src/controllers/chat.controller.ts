import { Controller, UsePipes, Post, Body } from '@nestjs/common';
import { ChatService } from '@src/services';
import { ChatDto } from '@src/interfaces';
import { JoiValidationPipe } from '@src/pipes/joi-validation.pipe';
import { chatSchema } from '@src/schemas';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(chatSchema))
  async processMessage(@Body() chat: ChatDto): Promise<{ response: string }> {
    return this.chatService.processMessage(chat);
  }
}
