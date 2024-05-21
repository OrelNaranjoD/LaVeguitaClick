import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Global prefix configuration
  app.setGlobalPrefix('api/v1')

  // CORS implementation
  app.enableCors({ origin: 'http://localhost:4200' })

  // Swagger implementation
  const options = new DocumentBuilder()
    .setTitle('La VeguitaClick API')
    .setDescription('API for the company La VeguitaClick')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('support/api', app, document, {
    customSiteTitle: 'La VeguitaClick API',
    customCss: '.swagger-ui .topbar { display: none }'
  })

  // Start the server
  await app.listen(3000)

}
bootstrap()