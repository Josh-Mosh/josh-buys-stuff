import { success, notFound } from '../../services/response/'
import { Theme } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Theme.create(body)
    .then((theme) => theme.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Theme.find(query, select, cursor)
    .then((themes) => themes.map((theme) => theme.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Theme.findById(params.id)
    .then(notFound(res))
    .then((theme) => theme ? theme.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Theme.findById(params.id)
    .then(notFound(res))
    .then((theme) => theme ? Object.assign(theme, body).save() : null)
    .then((theme) => theme ? theme.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Theme.findById(params.id)
    .then(notFound(res))
    .then((theme) => theme ? theme.remove() : null)
    .then(success(res, 204))
    .catch(next)
