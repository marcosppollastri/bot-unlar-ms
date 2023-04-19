import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '@src/services';
import { ChatDto } from '@src/interfaces';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processMessage', () => {
    it('should return the expected response for a given chatDto', async () => {
      const chatDto: ChatDto = {
        user: 'TestUser',
        message: 'Hello!',
        lang: 'en',
      };

      const expectedResponse = {
        response: `Hello, ${chatDto.user}. You said: ${chatDto.message}`,
      };

      const result = await service.processMessage(chatDto);

      expect(result).toEqual(expectedResponse);
    });
  });
});
