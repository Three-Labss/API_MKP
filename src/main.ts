import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
  });
  app.enableVersioning({
    defaultVersion: process.env.API_VERSION.split('.')[0],
    type: VersioningType.URI,
  });

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const config = new DocumentBuilder()
    .setTitle('MKP API')
    .setDescription('The MKP API description')
    .setVersion(process.env.API_VERSION as string)
    .addTag(
      'MKP',
      'API de MKP para la gestión de pedidos y productos de la tienda online. ',
    )
    .addSecurityRequirements('bearer')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setTermsOfService('https://example.com/')
    .setLicense('LICENSIA NO COMERCIAL Y PRIVADA', 'https://example.com/')
    .setContact('Contacto', 'https://example.com/', 'kevnnard.films@gmail.com')

    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT || 4001);
}
bootstrap();
