import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Set } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, sets

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  sets = await Sets.create({})
})

test('POST /sets 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({
      access_token: adminSession,
      setId: 'test',
      name: 'test',
      description: 'test',
      pieces: 'test',
      age: 'test',
      price: 'test',
      imgUrl: 'test',
      affiliateLink: 'test',
      favorite: true,
      hidden: false,
      videoId: 'test',
    })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.setId).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.pieces).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.imgUrl).toEqual('test')
  expect(body.affiliateLink).toEqual('test')
  expect(body.favorite).toEqual(true)
  expect(body.hidden).toEqual(false)
  expect(body.videoId).toEqual('test')
})

test('POST /sets 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /sets 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /sets 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /sets/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${sets.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sets.id)
})

test('GET /sets/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /sets/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${sets.id}`)
    .send({
      access_token: adminSession,
      setId: 'test',
      name: 'test',
      description: 'test',
      pieces: 'test',
      age: 'test',
      price: 'test',
      imgUrl: 'test',
      affiliateLink: 'test',
      favorite: true,
      hidden: false,
      videoId: 'test',
    })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sets.id)
  expect(body.setId).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.pieces).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.imgUrl).toEqual('test')
  expect(body.affiliateLink).toEqual('test')
  expect(body.favorite).toEqual(true)
  expect(body.hidden).toEqual(false)
  expect(body.videoId).toEqual('test')
})

test('PUT /sets/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${sets.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /sets/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${sets.id}`)
  expect(status).toBe(401)
})

test('PUT /sets/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, setId: 'test', name: 'test', description: 'test', pieces: 'test', age: 'test', price: 'test', affiliateLink: 'test' })
  expect(status).toBe(404)
})

test('DELETE /sets/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${sets.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /sets/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${sets.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /sets/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${sets.id}`)
  expect(status).toBe(401)
})

test('DELETE /sets/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
