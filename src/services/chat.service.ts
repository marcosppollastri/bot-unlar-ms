import { Injectable } from '@nestjs/common';
import { ChatDto } from '@src/interfaces';

@Injectable()
export class ChatService {
  async processMessage(chat: ChatDto): Promise<{ response: string }> {
    // Implement your chatbot logic here
    const response = `Hello, ${chat.user}. You said: ${chat.message}`;

    return { response };
  }
}
