import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { generateSwagger } from '@src/middlewares/swagger';
import { bootstrap, runAppInProduction } from '@src/main';

jest.mock('@nestjs/core');
jest.mock('@src/app.module');
jest.mock('@src/middlewares/swagger');

describe('bootstrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should bootstrap the application', async () => {
    const app = {
      listen: jest.fn(),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(app);
    (generateSwagger as jest.Mock).mockResolvedValue(undefined);
    app.listen.mockResolvedValue(undefined);

    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(generateSwagger).toHaveBeenCalledWith(app);
    expect(app.listen).toHaveBeenCalledWith(3000);
  });

  it('should call bootstrap() when NODE_ENV is not set to "test"', async () => {
    const app = {
      listen: jest.fn(),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(app);

    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    await runAppInProduction();
    process.env.NODE_ENV = originalEnv;
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
  });
});
