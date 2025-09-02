import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: 'https://e-commerce-8-c3oo.onrender.com', // ton frontend Render

    credentials: true,
  });
    app.use('/webhook', bodyParser.raw({ type: 'application/json' }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
