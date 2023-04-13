import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';

import { generateSwagger } from '@src/middlewares/swagger';

describe('generateSwagger', () => {
  let app: INestApplication;

  beforeEach(() => {
    // Mock the INestApplication object
    app = {
      use: jest.fn(),
    } as unknown as INestApplication;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate Swagger documentation', async () => {
    // Mock the YAML file content
    const yamlContent = `
      openapi: 3.0.0
      info:
        title: Example API
        version: 1.0.0
    `;

    jest.spyOn(fs, 'readFileSync').mockReturnValue(yamlContent);

    // Call the function to generate Swagger documentation
    const result = await generateSwagger(app);

    // Check that the setup function was called with the expected arguments
    expect(SwaggerModule.setup).toHaveBeenCalledWith('api', app, {
      openapi: '3.0.0',
      info: {
        title: 'Example API',
        version: '1.0.0',
      },
    });
  });

  it('should throw an error if the YAML file cannot be read', async () => {
    // Mock the fs.readFileSync method to throw an error
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Unable to read file');
    });

    // Call the function and expect it to throw an error
    await expect(generateSwagger(app)).rejects.toThrowError('Unable to read file');

    // Check that the SwaggerModule.setup function was not called
    expect(SwaggerModule.setup).not.toHaveBeenCalled();
  });
});
