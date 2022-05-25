import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Requisições feitas ao endpoint de Login', () => {
  let res: Response

  it('Uma requisição errada deve retornar status 401', async () => {
    const request = {
      email: 'teste@teste.com',
      password: 'qqSenha'
    }
    res = await chai.request(app).post('/login').send(request);
    expect(res).to.have.status(401);
  })

  it('Uma requisição correta deve retornar status 200', async () => {
    const request = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    }
    res = await chai.request(app).post('/login').send(request);
    expect(res).to.have.status(200);
    expect(res.body.user).to.include({ id: 1 });
  })
})