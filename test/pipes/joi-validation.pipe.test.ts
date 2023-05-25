import { JoiValidationPipe } from '@src/pipes';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import { chatSchema } from '@src/schemas/chat.schema'
import { ChatDto } from '@src/interfaces';

describe('JoiValidationPipe', () => {

  const pipe = new JoiValidationPipe(chatSchema);

  describe('transform', () => {
    it('should validate the input value against the schema', () => {
      const input: ChatDto = { user: 'test', message: 'test123', lang: 'es' };
      const result = pipe.transform(input, {} as ArgumentMetadata);
      expect(result).toEqual(input);
    });

    it('should return the input value if it is valid', () => {
      const input: ChatDto = { user: 'test', message: 'test123', lang: 'es' };
      const result = pipe.transform(input, {} as ArgumentMetadata);
      expect(result).toEqual(input);
    });

    it('should throw a BadRequestException if the input value is invalid', () => {
      const input = { username: 'test' };
      expect(() => pipe.transform(input, {} as ArgumentMetadata)).toThrowError(
        BadRequestException,
      );
    });
  });
});
