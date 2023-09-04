import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('/api/v1');

  const port = process.env.PORT || 3001;

  const config = new DocumentBuilder()
    .setTitle('API - Tasks services')
    .setDescription(
      'the api is consumed by other services and by the client itself',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your JWT token',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
