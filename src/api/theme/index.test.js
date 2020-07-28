import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Theme } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, theme

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  theme = await Theme.create({})
})

test('POST /themes 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', logoUrl: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.logoUrl).toEqual('test')
})

test('POST /themes 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /themes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /themes 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /themes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${theme.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(theme.id)
})

test('GET /themes/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /themes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${theme.id}`)
    .send({ access_token: adminSession, name: 'test', logoUrl: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(theme.id)
  expect(body.name).toEqual('test')
  expect(body.logoUrl).toEqual('test')
})

test('PUT /themes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${theme.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /themes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${theme.id}`)
  expect(status).toBe(401)
})

test('PUT /themes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', logoUrl: 'test' })
  expect(status).toBe(404)
})

test('DELETE /themes/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${theme.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /themes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${theme.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /themes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${theme.id}`)
  expect(status).toBe(401)
})

test('DELETE /themes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
