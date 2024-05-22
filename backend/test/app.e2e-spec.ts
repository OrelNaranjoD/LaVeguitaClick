import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

describe('Aplication (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.enableCors({ origin: 'http://localhost:4200', preflightContinue: true });

    const options = new DocumentBuilder()
      .setTitle('La VeguitaClick API')
      .setDescription('API for the company La VeguitaClick')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('support/api', app, document, {
      customSiteTitle: 'La VeguitaClick API',
      customCss: '.swagger-ui .topbar { display: none }'
    });

    await app.init();
    dataSource = app.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should start the server and listen on port 3000', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1');
    expect(response.status).toBe(200);
  });

  it('should have a global prefix', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/non-existent-route');
    expect(response.status).toBe(404);
  });

  it('should allow CORS for http://localhost:4200', async () => {
    let response = await request(app.getHttpServer())
      .options('/api/v1')
      .set('Origin', 'http://localhost:4200');
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:4200');
    response = await request(app.getHttpServer())
      .get('/api/v1/non-existent-route')
      .set('Origin', 'http://localhost:4200');
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:4200');
  });

  it('should serve swagger documentation', () => {
    return request(app.getHttpServer())
      .get('/support/api')
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('La VeguitaClick API');
        expect(res.text).toContain('.swagger-ui .topbar { display: none }');
      });
  });

  it('should connect to the database', async () => {
    expect(dataSource.isInitialized).toBe(true);
  });
});