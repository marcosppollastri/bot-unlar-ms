import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from '@src/controllers';
import { ChatService } from '@src/services';
import { ChatDto } from '@src/interfaces';
import { JoiValidationPipe } from '@src/pipes';
import { chatSchema } from '@src/schemas';

describe('ChatController', () => {
  let controller: ChatController;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [ChatService],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    chatService = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('processMessage', () => {
    it('should return the expected response from the chatService', async () => {
      const chatDto: ChatDto = {
        user: 'TestUser',
        message: 'Hello!',
        lang: 'en',
      };

      const chatResponse = {
        response: 'Hello, TestUser. You said: Hello!',
      };

      jest
        .spyOn(chatService, 'processMessage')
        .mockImplementation(() => Promise.resolve(chatResponse));

      const result = await controller.processMessage(chatDto);

      expect(result).toEqual(chatResponse);
      expect(chatService.processMessage).toHaveBeenCalledWith(chatDto);
    });

    it('should throw BadRequestException when validation fails', async () => {
      const chatDto: ChatDto = {
        user: '',
        message: '',
      };

      const joiValidationPipe = new JoiValidationPipe(chatSchema);

      try {
        await joiValidationPipe.transform(chatDto, { type: 'body' });
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toBe('Validation failed');
      }
    });
  });
});
