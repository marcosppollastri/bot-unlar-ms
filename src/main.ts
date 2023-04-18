import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { generateSwagger } from '@src/middlewares/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await generateSwagger(app);
  await app.listen(3000);
  console.log('Nest application is listening on port 3000');
}

export function runAppInProduction() {
  if (process.env.NODE_ENV !== 'test') {
    bootstrap();
  }
}

runAppInProduction();
