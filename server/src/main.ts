import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as ContextService from 'request-context';
import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const { PORT = 3001 } = process.env;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(); // Enable CORS
  app.use(compression()); // Node.js compression middleware.
  app.use(morgan('combined')); // HTTP request logger middleware

  app.use(json({ limit: '50mb' })); // Limit json
  app.use(urlencoded({ limit: '50mb', extended: true })); // Limit url
  app.use(ContextService.middleware('request')); // Use ContextService

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      validationError: {
        target: false,
      },
    }),
  );

  // Setup swagger
  const documentConfig = new DocumentBuilder()
    .setTitle('Booking APIs Swagger')
    .setDescription('The Booking APIs description')
    .setVersion('1.0')
    .addTag('Booking')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);

  console.info(`Server running on port ${PORT} 🤟`);
}
bootstrap();
