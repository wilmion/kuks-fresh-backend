import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Kuks Fresh')
    .setDescription(
      `Esta API esta creada para mi proyecto frontend , E-comerce de venta de comida.
      Todas las peticiones regresan un :\n
      {
        status: STATUS,
        data: MENSAJE DE LOS DATOS EN LAS RUTAS SI EL STATUS ES DIFERENTE A 500 O 404,
        error: MENSAJE DE LOS DATOS EN LAS RUTAS SI EL STATUS ES DIFERENTE A 200 O 201
      }`,
    )
    .setVersion('1.0')
    .addTag('kuks-fresh')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
