import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.intercepter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Logging Interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3005);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
