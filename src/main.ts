import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { generateSwagger } from './middlewares/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  generateSwagger(app);
  await app.listen(3000);
}
bootstrap();

