import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: { origin: 'http://localhost:4000' } });
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Урок по продвинутому бэкенду')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('UlbiTV')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}/`));
}
void bootstrap();
