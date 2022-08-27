import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  await app.init();
  // http.createServer(server).listen(4000);
  await app.listen(4000);
}
bootstrap();
