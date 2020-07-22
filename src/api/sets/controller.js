import { success, notFound } from '../../services/response/'
import { Sets } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Sets.create(body)
    .then((sets) => sets.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Sets.count(query)
    .then(count => Sets.find(query, select, cursor)
      .then((sets) => ({
        count,
        rows: sets.map((sets) => sets.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Sets.findById(params.id)
    .then(notFound(res))
    .then((sets) => sets ? sets.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Sets.findById(params.id)
    .then(notFound(res))
    .then((sets) => sets ? Object.assign(sets, body).save() : null)
    .then((sets) => sets ? sets.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Sets.findById(params.id)
    .then(notFound(res))
    .then((sets) => sets ? sets.remove() : null)
    .then(success(res, 204))
    .catch(next)
