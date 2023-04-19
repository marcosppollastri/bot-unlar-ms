import { JoiValidationPipe } from '@src/pipes';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

describe('JoiValidationPipe', () => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const pipe = new JoiValidationPipe(schema);

  describe('transform', () => {
    it('should validate the input value against the schema', () => {
      const input = { username: 'test', password: 'test123' };
      const result = pipe.transform(input, {} as ArgumentMetadata);
      expect(result).toEqual(input);
    });

    it('should return the input value if it is valid', () => {
      const input = { username: 'test', password: 'test123' };
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
