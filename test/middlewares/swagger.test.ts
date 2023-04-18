import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import { generateSwagger } from '@src/middlewares/swagger';

jest.mock('fs');
jest.mock('path');
jest.mock('yaml');
jest.mock('@nestjs/swagger', () => ({
  SwaggerModule: {
    setup: jest.fn(),
  },
}));

describe('generateSwagger', () => {
  let app: INestApplication;

  beforeEach(() => {
    app = {} as INestApplication;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully generate swagger documentation', async () => {
    const filePath = 'test-file-path';
    const fileContent = 'test-file-content';
    const yamlParsed = { key: 'value' };

    (path.join as jest.Mock).mockReturnValue(filePath);
    (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);
    (YAML.parse as jest.Mock).mockReturnValue(yamlParsed);
    (SwaggerModule.setup as jest.Mock).mockReturnValue(undefined);

    await generateSwagger(app);

    expect(path.join).toHaveBeenCalledWith(process.cwd(), 'docs/swagger.yaml');
    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    expect(YAML.parse).toHaveBeenCalledWith(fileContent);
    expect(SwaggerModule.setup).toHaveBeenCalledWith('api', app, yamlParsed);
  });

  it('should throw an error if unable to read the file', async () => {
    const errorMessage = 'Test error message';
    (path.join as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await expect(generateSwagger(app)).rejects.toThrowError(
      `Unable to read file: ${errorMessage}`,
    );

    expect(path.join).toHaveBeenCalledWith(process.cwd(), 'docs/swagger.yaml');
    expect(fs.readFileSync).not.toHaveBeenCalled();
    expect(YAML.parse).not.toHaveBeenCalled();
    expect(SwaggerModule.setup).not.toHaveBeenCalled();
  });
});
