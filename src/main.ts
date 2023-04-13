import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { generateSwagger } from '@src/middlewares/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await generateSwagger(app);
  await app.listen(3000);
}
bootstrap();

