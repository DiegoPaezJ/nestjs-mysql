import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, HttpStatus, ValidationPipe } from '@nestjs/common'
import { ExceptionsLoggerFilter } from './posts/exceptionsLogger.filter';
import { ValidationError, useContainer } from 'class-validator';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   })
  // )

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: {},
          error: HttpStatus[HttpStatus.BAD_REQUEST],
        };

        errors.forEach((error) => {
          const field = error.property;
          const constraints = Object.values(error.constraints);
          response.message[field] = constraints[0];
        });

        return response;
      },
    }),
  );
  // app.useGlobalFilters(new ExceptionsLoggerFilter());

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.enableCors();

  await app.listen(parseInt(process.env.PORT)|| 3001);
  // await app.listen(3001);
}
bootstrap();
