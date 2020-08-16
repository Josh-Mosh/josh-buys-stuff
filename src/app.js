import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

console.log('if', 'mongo.uri:', mongo.uri);

if (mongo.uri) {
  mongoose.connect(mongo.uri)
}
mongoose.Promise = Promise

console.log('ip ', ip);
console.log('port ', port);
console.log('env ', env);

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
