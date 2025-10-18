import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Strips properties that don't have decorators
      forbidNonWhitelisted: true, // Throws error for unexpected properties
      transform: true,           // Automatically transform payloads to DTO instances
    }),
  );

}
bootstrap();
