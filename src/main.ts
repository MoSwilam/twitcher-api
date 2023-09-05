import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.setGlobalPrefix('api');
  app.use(compression());

  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 200 // limit each IP to 100 requests per windowMs
    })
  );

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Twitcher API')
    .setDescription('Twitcher API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api-docs`, app, document);

  const port = process.env.PORT;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
