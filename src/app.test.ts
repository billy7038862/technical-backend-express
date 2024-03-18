import request from 'supertest';
import { app, setupDatabase } from './app';

beforeAll(async () => {
  await setupDatabase();
});

describe('Test /duties', () => {
  let key;
  it('GET /duties - success', async () => {
    const response = await request(app).get('/duties');
    expect(response.status).toEqual(200);
    // add more assertions as needed
  });

  it('POST /duties - success', async () => {
    const response = await request(app).post('/duties').send({ id: '1', name: 'test' });
    expect(response.status).toEqual(200);
    key = response.body.key
    // add more assertions as needed
  });

  it('PUT /duties/:key - success', async () => {
    const response = await request(app).put(`/duties/${key}`).send({ id: '1', name: 'test updated' });
    
    expect(response.status).toEqual(200);
    // add more assertions as needed
  });

  it('DELETE /duties/:key - success', async () => {
    const response = await request(app).delete(`/duties/${key}`);
    expect(response.status).toEqual(200);
    // add more assertions as needed
  });
});