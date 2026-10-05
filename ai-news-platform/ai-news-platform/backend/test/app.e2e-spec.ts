import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET) returns 401 without authentication', () => {
    return request(app.getHttpServer()).get('/').expect(401);
  });

  it('/ (GET) returns hello when authenticated', async () => {
    const agent = request.agent(app.getHttpServer());

    await agent
      .post('/auth/login')
      .send({
        email: process.env.ADMIN_EMAIL ?? 'admin@example.com',
        password: process.env.ADMIN_PASSWORD ?? 'admin123',
      })
      .expect(201);

    await agent.get('/').expect(200).expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});
